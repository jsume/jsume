import * as z from 'zod/v4'
import { awardsSchema } from './awards.schema'
import { basicsSchema } from './basics.schema'
import { certificatesSchema } from './certificates.schema'
import { educationSchema } from './educations.schema'
import { languagesSchema } from './languages.schema'
import { projectsSchema } from './projects.schema'
import { publicationsSchema } from './publications.schema'
import { skillsSchema } from './skills.schema'
import { workSchema } from './work.schema'

export {
  awardsSchema,
  basicsSchema,
  certificatesSchema,
  educationSchema,
  languagesSchema,
  projectsSchema,
  publicationsSchema,
  skillsSchema,
  workSchema,
}

export const jsumeSchema = z.looseObject({
  basics: basicsSchema,
  work: z.optional(workSchema),
  projects: z.optional(projectsSchema),
  publications: z.optional(publicationsSchema),
  education: z.optional(educationSchema),
  certificates: z.optional(certificatesSchema),
  awards: z.optional(awardsSchema),
  skills: z.optional(skillsSchema),
  languages: z.optional(languagesSchema),
}).meta({
  $id: 'https://jsume.moo.zone/schemas/jsume.schema.json',
  title: 'JSUME Schema',
})

export type Jsume = z.infer<typeof jsumeSchema>

export type { AwardsType } from './awards.schema'
export type { BasicsType } from './basics.schema'
export type { CertificatesType } from './certificates.schema'
export type { EducationType } from './educations.schema'
export type { LanguagesType } from './languages.schema'
export type { ProjectsType } from './projects.schema'
export type { PublicationsType } from './publications.schema'
export type { SkillsType } from './skills.schema'
export type { WorkType } from './work.schema'
