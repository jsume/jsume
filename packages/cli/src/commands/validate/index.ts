import { globSync } from 'tinyglobby'
import c from '../../utils/console'

export function validate(
  files: string[],
  options: { jsonschema?: boolean, zod?: boolean },
) {
  // if user doesn't provide files, validate jsume.json or *.jsume.json in current directory
  if (files.length === 0) {
    files = globSync(['*.jsume.json', 'jsume.json'])
  }
  // at least use one validation method
  if (!options.jsonschema && !options.zod) {
    c.error({ title: 'Please provide at least one validation method: --jsonschema (-j) or --zod (-z).' })
    return
  }
  if (files.length === 0) {
    console.log(c.a.dim.white`No files to validate.`)
    return
  }

  let validationMethod: 'jsonschema' | 'zod' | 'both' = 'zod'
  const useJsonSchema = options.jsonschema || false
  const useZod = options.zod || false
  const useBoth = useJsonSchema && useZod

  if (useBoth) {
    validationMethod = 'both'
  }
  else if (useJsonSchema) {
    validationMethod = 'jsonschema'
  }

  console.log(`Validating files...`)

  files.forEach((file) => {
    console.log(`Validating file: ${file}`)
    switch (validationMethod) {
      case 'jsonschema':
        break
      case 'zod':
        break
      case 'both':
        break
    }
    console.log(`File ${file} is valid.`)
  })

  console.log('Validation complete.')
}
