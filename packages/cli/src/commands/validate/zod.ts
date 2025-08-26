import { jsumeSchema } from '@jsume/schemas'
import * as z from 'zod'
import c from '../../utils/console'

export function validateWithZod(fileContent: string) {
  console.log(`  ${c.a.italic.whiteBright`Zod`}`)

  const contentObj = JSON.parse(fileContent)

  const result = jsumeSchema.safeParse(contentObj, {
    // rewrite error messages
    error: (iss) => {
      if (iss.code === 'too_small' && iss.minimum === 1) {
        return `${iss.origin.replace(/^(\w)/, (_, p1) => p1.toUpperCase())} can not be empty`
      }
      if (iss.code === 'invalid_format') {
        return `Invalid format: ${iss.format}`
      }
      if (iss.code === 'invalid_union') {
        const expected = iss.errors.flat().filter(e => 'expected' in e).map(e => e.expected)
        const values = iss.errors.flat().filter(e => 'values' in e).map(e => e.values).flat()
        return `Invalid union: expected ${[...new Set([...expected, ...values])].join(' or ')}`
      }
    },
  })

  if (!result.success) {
    let prettyError = z.prettifyError(result.error)

    // format error message with colors
    prettyError = prettyError
      .replaceAll(/(✖ )(.*)\n\s*(→) at (\S*)/g, (_, errIcon, errMsg, arrow, path) => {
        return `${c.a.redBright`    ${errIcon}`}${c.a.white`${path}\n      ${arrow}`} ${c.a.dim.white(errMsg)}`
      })

    console.log(prettyError)
    return false
  }

  c.success({ title: 'Valid jsume JSON file.', padding: 4 })
  return true
}
