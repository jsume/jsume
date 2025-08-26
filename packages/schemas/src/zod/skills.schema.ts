import * as z from 'zod/v4'
import { uniqueArray } from './common.schema'

const skillSchema = z.looseObject({
  name: z.string().min(1).meta({
    description: 'Name of the skill',
    examples: ['Frontend'],
  }),
  keywords: uniqueArray(z.string().min(1)).min(1).meta({
    description: 'List of keywords related to the skill',
    uniqueItems: true,
  }),
}).meta({
  description: 'Skill information',
})

export const skillsSchema = uniqueArray(skillSchema).min(1).meta({
  title: 'Skills',
  description: 'List of your skills',
  uniqueItems: true,
})

export type SkillsType = z.infer<typeof skillsSchema>
