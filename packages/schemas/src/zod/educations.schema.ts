import * as z from 'zod/v4'
import {
  endDateSchema,
  locationSchema,
  startDateSchema,
  uniqueArray,
} from './common.schema'
import { refineDate } from './refine'

const educationInfoSchema = z.looseObject({
  institution: z.string().min(1).meta({
    description: 'Name of the educational institution',
    examples: ['University of Example'],
  }),
  location: z.optional(locationSchema).meta({
    description: 'Where the institution is located or where you studied',
    examples: ['United States'],
  }),
  major: z.string().min(1).meta({
    description: 'Field of study or major',
    examples: ['Computer Science'],
  }),
  degree: z.string().min(1).meta({
    description: 'Degree obtained or pursued',
    examples: ['Bachelor of Science'],
  }),
  gpa: z.optional(z.number().min(0).max(5)).meta({
    description: 'Grade Point Average (GPA)',
    examples: [3.8],
  }),
  startDate: startDateSchema.meta({
    description: 'Start date of the education period',
  }),
  endDate: endDateSchema.meta({
    description: 'End date of the education period, or false if currently studying there',
  }),
  activities: z.optional(uniqueArray(z.string().min(1))).meta({
    description: 'Specify multiple activities you participated in during your education',
    uniqueItems: true,
  }),
  courses: z.optional(uniqueArray(z.string().min(1))).meta({
    description: 'Specify multiple relevant courses you took during your education',
    uniqueItems: true,
  }),
}).superRefine(refineDate).meta({
  description: 'Education information',
})

export const educationSchema = uniqueArray(educationInfoSchema).min(1).meta({
  title: 'Educations',
  description: 'List of educations',
  uniqueItems: true,
})

export type EducationType = z.infer<typeof educationSchema>
