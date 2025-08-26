import * as z from 'zod/v4'
import {
  dateSchema,
  uniqueArray,
  webUrlSchema,
} from './common.schema'

const publicationSchema = z.looseObject({
  name: z.string().min(1).meta({
    description: 'Name of the publication',
    examples: ['The World Wide Web'],
  }),
  releaseDate: dateSchema.meta({
    description: 'Date when the publication was released',
  }),
  publisher: z.optional(z.string().min(1)).meta({
    description: 'Name of the publisher or organization that released the publication',
    examples: ['IEEE, Computer Magazine'],
  }),
  summary: z.optional(z.string().min(1)).meta({
    description: 'Short summary of publication',
    examples: ['Discussion of the World Wide Web, HTTP, HTML.'],
  }),
  url: z.optional(webUrlSchema).meta({
    description: 'URL to the publication',
    examples: ['https://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html'],
  }),
}).meta({
  description: 'Publication information',
})

export const publicationsSchema = uniqueArray(publicationSchema).min(1).meta({
  title: 'Publications',
  description: 'Specify your publications through your career',
  uniqueItems: true,
})

export type PublicationsType = z.infer<typeof publicationsSchema>
