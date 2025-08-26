import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import tlink from 'terminal-link'
import { globSync } from 'tinyglobby'
import c from '../../utils/console'
import { validateWithJsonschema } from './jsonschema'
import { validateWithZod } from './zod'

export function validate(
  files: string[],
  options: { jsonschema?: boolean, zod?: boolean },
) {
  // if user doesn't provide files, validate jsume.json or *.jsume.json in current directory
  if (files.length === 0) {
    files = globSync(['*.jsume.json', 'jsume.json'])
  }

  if (options.jsonschema === undefined && options.zod === undefined) {
    options.zod = true
    options.jsonschema = true
  }

  if (files.length === 0) {
    console.log(c.a.dim.white`No files to validate.`)
    return
  }

  const useJsonSchema = options.jsonschema || false
  const useZod = options.zod || false
  const useBoth = useJsonSchema && useZod

  let validationMethod: 'jsonschema' | 'zod' | 'both' = 'both'
  if (useBoth) {
    validationMethod = 'both'
  }
  else if (useJsonSchema) {
    validationMethod = 'jsonschema'
  }
  else if (useZod) {
    validationMethod = 'zod'
  }

  files.forEach((file) => {
    console.log(`${c.a.bold.whiteBright`> ${file}`}`)

    const filePath = path.resolve(process.cwd(), file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    let successFlag = true
    switch (validationMethod) {
      case 'jsonschema':
        successFlag = validateWithJsonschema(fileContent)
        break
      case 'zod':
        successFlag = validateWithZod(fileContent)
        break
      case 'both':
        {
          const zodSuccess = validateWithZod(fileContent)
          const jsonschemaSuccess = validateWithJsonschema(fileContent)
          successFlag = zodSuccess && jsonschemaSuccess
        }
        break
    }
    if (!successFlag) {
      // show user readme link for more information
      console.log(`\n${c.a.dim.whiteBright(tlink('🔗 Learn more about jsume JSON file', 'https://github.com/jsume/jsume/blob/main/packages/schemas/README.md'))}\n`)
    }
  })
}
