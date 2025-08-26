import * as z from 'zod/v4'
import {
  locationSchema,
  webUrlSchema,
} from './common.schema'

const profileSchema = z.object({
  network: z.string().min(1).meta({
    description: 'Social media',
    examples: ['X/Twitter'],
  }),
  username: z.string().min(1).meta({
    description: 'Your username on the social media',
    examples: ['john'],
  }),
  url: webUrlSchema.meta({
    description: 'URL to your profile on the social media',
    examples: ['https://x.com/john'],
  }),
})

export const basicsSchema = z.looseObject({
  name: z.string().min(1).meta({
    description: 'Your name',
    examples: ['John Doe'],
  }),
  label: z.optional(z.string().min(1)).meta({
    description: 'Your professional label or title',
    examples: ['Software Engineer'],
  }),
  image: z.optional(webUrlSchema).meta({
    description: 'URL to your profile image',
    examples: ['https://example.com/profile.jpg'],
  }),
  email: z.optional(z.email()).meta({
    description: 'Your email address',
    examples: ['john@example.com'],
  }),
  phone: z.optional(z.string().min(1)).meta({
    description: 'Your phone number',
    examples: ['(912) 555-4321'],
  }),
  url: z.optional(webUrlSchema).meta({
    description: 'Url to your personal website or portfolio',
    examples: ['https://johndoe.com'],
  }),
  summary: z.optional(z.string().min(1)).meta({
    description: 'Write a short 2-3 sentence biography about yourself',
    examples: ['I am John Doe, a software engineer with 5 years of experience in web development...'],
  }),
  location: z.optional(locationSchema).meta({
    description: 'Your current location',
  }),
  profiles: z.optional(z.array(profileSchema)).meta({
    description: 'Specify any number of social networks that you participate in',
  }),
}).meta({
  title: 'Basics',
  description: 'Basic information about yourself',
})

export type BasicsType = z.infer<typeof basicsSchema>
