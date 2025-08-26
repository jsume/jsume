import schema2020 from '@jsume/schemas/draft-2020-12.json' with { type: 'json' }
import addFormats from 'ajv-formats'
import Ajv2020 from 'ajv/dist/2020.js'
import c from '../../utils/console'

const ajv = new Ajv2020({ allErrors: true })
addFormats(ajv)

export function validateWithJsonschema(fileContent: string) {
  console.log(`  ${c.a.italic.whiteBright`JSON Schema`}`)

  const contentObj = JSON.parse(fileContent)
  const validate = ajv.compile(schema2020)
  const valid = validate(contentObj)
  if (!valid) {
    let errorText = ajv.errorsText(validate.errors, { separator: '\n' })
    errorText = errorText.replaceAll(
      /^(\S*) (.*)/gm,
      (_, path, errMsg) => {
        return `${c.a.redBright`    ✖`} ${c.a.white(path)}\n      → ${c.a.dim.white(errMsg)}`
      },
    )
    console.log(c.a.white(errorText))
    return false
  }

  c.success({ title: 'Valid jsume JSON file.', padding: 4 })
  return true
}
