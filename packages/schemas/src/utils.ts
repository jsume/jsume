import * as z from 'zod/v4'

const ToJsonSchemVer = z.string().transform((input) => {
  const validVersions = {
    '7': 'draft-7',
    'draft-7': 'draft-7',
    'draft-07': 'draft-7',
    '2020-12': 'draft-2020-12',
    'draft-2020-12': 'draft-2020-12',
  } as const
  if (input in validVersions) {
    return validVersions[input as keyof typeof validVersions]
  }
  return 'draft-7'
})

export function parseJsonSchemaVersion(input: unknown) {
  if (typeof input === 'string' || typeof input === 'number') {
    return ToJsonSchemVer.parse(input)
  }
  return 'draft-7'
}
