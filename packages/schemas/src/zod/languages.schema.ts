import * as z from 'zod/v4'
import { uniqueArray } from './common.schema'

const languageSchema = z.looseObject({
  language: z.string().min(1).meta({
    description: 'Name of the language',
    examples: ['English'],
  }),
  fluency: z.string().min(1).meta({
    description: 'Fluency level in the language',
    examples: ['Fluent'],
  }),
}).meta({
  description: 'Language information',
})

export const languagesSchema = uniqueArray(languageSchema).min(1).meta({
  title: 'Languages',
  description: 'List the languages you speak',
  uniqueItems: true,
})

export type LanguagesType = z.infer<typeof languagesSchema>
