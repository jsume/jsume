// put jsonSchema string into filesystem
import fs from 'node:fs'
import path from 'node:path'

import z from 'zod/v4'
import { jsumeSchema } from '../zod'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const jsonSchemaDraft7 = z.toJSONSchema(jsumeSchema, {
  target: 'draft-7',
})
const jsonSchemaDraft2020 = z.toJSONSchema(jsumeSchema, {
  target: 'draft-2020-12',
})

const outputDir = path.resolve(__dirname, '../../dist')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

fs.writeFileSync(
  path.join(outputDir, 'draft-7.json'),
  JSON.stringify(jsonSchemaDraft7, (key, val) => {
    // remove 'dependentRequired'
    if (key === 'dependentRequired') {
      return undefined
    }
    return val
  }, 2),
)
fs.writeFileSync(
  path.join(outputDir, 'draft-2020-12.json'),
  JSON.stringify(jsonSchemaDraft2020, null, 2),
)
