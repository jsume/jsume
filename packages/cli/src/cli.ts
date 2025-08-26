import cac from 'cac'
import restoreCursor from 'restore-cursor'
import pkgJson from '../package.json'
import { newJsumeFiles } from './commands/new'
import { validate } from './commands/validate'

const cli = cac('jsume')

cli
  .command('new [...files]', 'Create jsume JSON files')
  .alias('n')
  .option('-e, --example', 'Create example jsume JSON files instead of empty ones')
  .option('-r, --recursive', 'Create files recursively in directories')
  .action((files, options) => {
    newJsumeFiles(files, options)
  })

cli
  .command('validate [...files]', 'Validate jsume JSON files')
  .alias('v')
  .option('-j, --jsonschema', 'Use JSON Schema for validation')
  .option('-z, --zod', 'Use Zod for validation')
  .action((files, options) => {
    validate(files, options)
  })

cli
  .help()
  .version(pkgJson.version)
  .parse()

restoreCursor()
