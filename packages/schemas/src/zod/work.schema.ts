import * as z from 'zod/v4'
import {
  endDateSchema,
  locationSchema,
  startDateSchema,
  uniqueArray,
  webUrlSchema,
} from './common.schema'
import { refineDate } from './refine'

const workInfoSchema = z.looseObject({
  company: z.string().min(1).meta({
    description: 'Company name',
    examples: ['The Company'],
  }),
  location: z.optional(locationSchema).meta({
    description: 'Where you worked or where the company is located',
  }),
  position: z.string().min(1).meta({
    description: 'Your position at the company',
    examples: ['Software Engineer'],
  }),
  website: z.optional(webUrlSchema).meta({
    description: 'Url to the company website',
    examples: ['https://company.com'],
  }),
  startDate: startDateSchema.meta({
    description: 'Start date of the work period',
  }),
  endDate: endDateSchema.meta({
    description: 'End date of the work period, or false if currently working there',
  }),
  summary: z.optional(z.string().min(1)).meta({
    description: 'Give an overview of your responsibilities at the company',
    examples: ['Here is the summary of my work...'],
  }),
  highlights: z.optional(uniqueArray(z.string().min(1)).min(1)).meta({
    description: 'List of highlights or achievements during your time at the company',
    uniqueItems: true,
  }),
}).superRefine(refineDate).meta({
  description: 'Working experience information',
})

export const workSchema = uniqueArray(workInfoSchema).min(1).meta({
  title: 'Work',
  description: 'List of working experiences',
  uniqueItems: true,
})
export type WorkType = z.infer<typeof workSchema>
