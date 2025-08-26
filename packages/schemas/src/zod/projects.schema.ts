import * as z from 'zod/v4'
import {
  endDateSchema,
  githubUrlSchema,
  startDateSchema,
  uniqueArray,
  webUrlSchema,
} from './common.schema'

const projectSchema = z.looseObject({
  name: z.string().meta({
    description: 'Project name',
    examples: ['My First Project'],
  }),
  website: z.optional(webUrlSchema).meta({
    description: 'Url to the project website',
    examples: ['https://projects.johndoe.com/my-first-project'],
  }),
  githubUrl: z.optional(githubUrlSchema).meta({
    description: 'Url to the project repository on GitHub',
    examples: ['https://github.com/johndoe/my-first-project-repo'],
  }),
  startDate: z.optional(startDateSchema).meta({
    description: 'Start date of the project',
  }),
  endDate: z.optional(endDateSchema).meta({
    description: 'End date of the project, or false if the project is ongoing',
  }),
  summary: z.optional(z.string().min(1)).meta({
    description: 'Give an overview of your project',
    examples: ['Here is the summary of my project...'],
  }),
  highlights: z.optional(uniqueArray(z.string().min(1)).min(1)).meta({
    description: 'List of highlights or achievements during your project',
    uniqueItems: true,
  }),
}).superRefine((data, ctx) => {
  if (data.startDate === undefined && data.endDate === undefined) { /* empty */ }
  // startDate and endDate should be dependent required
  else if (data.startDate !== undefined && data.endDate === undefined) {
    ctx.addIssue({
      code: 'custom',
      message: 'End date is required if start date is provided',
      path: ['endDate'],
    })
  }
  else if (data.startDate === undefined && data.endDate !== undefined) {
    ctx.addIssue({
      code: 'custom',
      message: 'Start date is required if end date is provided',
      path: ['startDate'],
    })
  }
  // if endDate is not 'false', startDate and endDate shouold be the same type
  else if (data.endDate !== false && typeof data.startDate !== typeof data.endDate) {
    ctx.addIssue({
      code: 'custom',
      message: 'End date should be the same type as start date or false',
      path: ['endDate'],
    })
  }
  // endDate should be greater than or equal to startDate
  else if (typeof data.startDate === 'object' && typeof data.endDate === 'object') {
    if ((data.startDate.day && !data.endDate.day) || (data.endDate.day && !data.startDate.day)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Start date and end date should both be complete dates or both be partial dates',
        path: ['endDate'],
      })
    }
    const [s, e] = [data.startDate, data.endDate]
    Object.keys(e).forEach((key) => {
      const k = key as keyof typeof e
      if (s[k] && e[k] && s[k] > e[k]) {
        ctx.addIssue({
          code: 'custom',
          message: 'End date should be greater than or equal to start date',
          path: ['endDate'],
        })
      }
    })
  }
  else if (typeof data.startDate === 'string' && typeof data.endDate === 'string') {
    if (data.startDate > data.endDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date should be greater than or equal to start date',
        path: ['endDate'],
      })
    }
  }
}).meta({
  description: 'Project information',
  dependentRequired: { startDate: ['endDate'], endDate: ['startDate'] },
})

export const projectsSchema = uniqueArray(projectSchema).min(1).meta({
  title: 'Projects',
  description: 'List your projects and personal work experience, including open source contributions and side projects',
  uniqueItems: true,
})

export type ProjectsType = z.infer<typeof projectsSchema>
