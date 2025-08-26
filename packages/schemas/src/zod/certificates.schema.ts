import * as z from 'zod/v4'
import {
  dateSchema,
  endDateSchema,
  uniqueArray,
  webUrlSchema,
} from './common.schema'
import { refineIssExpDate } from './refine'

const certificateSchema = z.looseObject({
  name: z.string().min(1).meta({
    description: 'Name of the certificate',
    examples: ['Certified Kubernetes Administrator'],
  }),
  issueDate: dateSchema.meta({
    description: 'Date when the certificate was received',
  }),
  expDate: endDateSchema.meta({
    description: 'Expiration date of the certificate, or false if it does not expire',
  }),
  issuer: z.string().min(1).meta({
    description: 'Organization or individual who granted the certificate',
    examples: ['CNCF'],
  }),
  url: z.optional(webUrlSchema).meta({
    description: 'URL to the certificate or credential',
    examples: ['https://www.youracclaim.com/badges/xxxx'],
  }),
}).superRefine(refineIssExpDate).meta({
  description: 'Certificate information',
})

export const certificatesSchema = uniqueArray(certificateSchema).min(1).meta({
  title: 'Certificates',
  description: 'Specify any certificates you have received throughout your professional career',
  uniqueItems: true,
})

export type CertificatesType = z.infer<typeof certificatesSchema>
