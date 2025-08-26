import * as z from 'zod/v4'
import {
  dateSchema,
  uniqueArray,
} from './common.schema'

const awardSchema = z.looseObject({
  title: z.string().min(1).meta({
    description: 'Title of the award or honor',
    examples: ['Employee of the Month'],
  }),
  date: dateSchema.meta({
    description: 'Date when the award or honor was received',
  }),
  awarder: z.string().min(1).meta({
    description: 'Organization or individual who granted the award or honor',
    examples: ['Tech Company Inc.'],
  }),
  summary: z.string().min(1).meta({
    description: 'Summary of the award or honor',
    examples: ['Awarded for outstanding performance and dedication to the team.'],
  }),
  description: z.optional(z.string().min(1)).meta({
    description: 'Detailed description of the award or honor',
    examples: ['I play a key role in the team and help the team achieve its goals...'],
  }),
}).meta({
  description: 'Award or honor information',
})

export const awardsSchema = uniqueArray(awardSchema).min(1).meta({
  title: 'Awards',
  description: 'List of your awards or honors',
  uniqueItems: true,
})

export type AwardsType = z.infer<typeof awardsSchema>
