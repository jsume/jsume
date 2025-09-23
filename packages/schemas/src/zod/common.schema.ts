import * as z from 'zod/v4'

export function uniqueArray<T>(schema: z.ZodType<T>, message?: string) {
  return z
    .array(schema)
    .superRefine((arr, ctx) => {
      const stringifyArr = arr.map(item => JSON.stringify(item))
      if (arr.length !== new Set(stringifyArr).size || arr.length !== new Set(arr).size) {
        ctx.addIssue({
          code: 'custom',
          message: `Not unique: ${message || 'array must have unique items'}`,
        })
      }
    })
}

export const webUrlSchema = z.url({
  protocol: /^https?$/,
  hostname: z.regexes.domain,
}).meta({
  title: 'Web URL',
})

export const githubUrlSchema = z.url({
  // e.g. https://www.github.com/johndoe/reponame
  protocol: /^https?$/,
  hostname: /^github\.com$/,
}).meta({
  title: 'GitHub URL',
})

export const locationSchema = z.union([
  z.string().min(1).meta({
    description: 'Location as a string',
    examples: ['Seattle, WA, USA'],
  }),
  z.object({
    city: z.string().min(1).meta({
      description: 'City name',
      examples: ['Seattle'],
    }),
    country: z.string().min(1).meta({
      description: 'Country name',
      examples: ['United States'],
    }),
  }),
]).meta({
  title: 'Location',
})
export type LocationType = z.infer<typeof locationSchema>

export const dateObjSchema = z.object({
  year: z.number().int().min(1900, 'Year must be at least 1900').meta({
    description: 'Year of the date',
  }),
  month: z.number().int().min(1).max(12).meta({
    description: 'Month of the date (1-12)',
  }),
  day: z.optional(z.number().int().min(1).max(31)).meta({
    description: 'Day of the date (1-31)',
  }),
}).meta({
  title: 'Date Object',
})
export type DateObjType = z.infer<typeof dateObjSchema>

export const dateSchema = z.union([
  z.iso.date(),
  dateObjSchema,
]).meta({
  title: 'Date',
})
export type DateType = z.infer<typeof dateSchema>

export const startDateSchema = dateSchema

export const endDateSchema = z.union([
  z.literal(false).meta({
    description: 'False means no end date',
  }),
  z.iso.date(),
  dateObjSchema,
]).meta({
  title: 'End Date',
})
export type EndDateType = z.infer<typeof endDateSchema>
