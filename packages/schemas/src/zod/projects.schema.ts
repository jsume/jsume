import * as z from 'zod/v4'
import {
  endDateSchema,
  githubUrlSchema,
  startDateSchema,
  uniqueArray,
  webUrlSchema,
} from './common.schema'
import { refineDateDependentRequired } from './refine'

const projectSchema = z.looseObject({
  name: z.string().min(1).meta({
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
}).superRefine(refineDateDependentRequired).meta({
  description: 'Project information',
  dependentRequired: { startDate: ['endDate'], endDate: ['startDate'] },
})

export const projectsSchema = uniqueArray(projectSchema).min(1).meta({
  title: 'Projects',
  description: 'List your projects and personal work experience, including open source contributions and side projects',
  uniqueItems: true,
})

export type ProjectsType = z.infer<typeof projectsSchema>
