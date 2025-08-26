import fs from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import c from '../../utils/console'
import emptyJsumeJson from './empty.jsume.json'
import exampleJsumeJson from './example.jsume.json'

export function newJsumeFiles(
  files: string[],
  options: { example?: boolean, recursive?: boolean },
) {
  const isExample = options.example || false // if is example, create files with example content
  const isRecursive = options.recursive || false // if is recursive, create files in directories recursively

  if (files.length === 0) {
    files = ['jsume.json'] // default file name
  }

  files.forEach((file) => {
    console.log(`${c.a.bold.whiteBright`> ${file}`}`)

    const fullPath = path.resolve(cwd(), file)
    const filename = path.basename(fullPath)
    const dir = path.dirname(fullPath)

    if (path.extname(filename).toLowerCase() !== '.json') {
      c.error({
        title: 'Invalid file extension, only .json files are allowed',
        message: filename,
        padding: 2,
      })
      return
    }

    if (isRecursive) {
      fs.mkdirSync(dir, { recursive: true })
    }
    else {
      if (!fs.existsSync(dir)) {
        c.error({
          title: 'Directory does not exist',
          message: dir,
          padding: 2,
        })
        return
      }
    }

    if (fs.existsSync(fullPath)) {
      c.error({
        title: 'File already exists',
        message: c.link(fullPath, `file://${fullPath}`),
        padding: 2,
      })
      return
    }

    const content = isExample ? JSON.stringify(exampleJsumeJson, null, 2) : JSON.stringify(emptyJsumeJson, null, 2)

    fs.writeFileSync(fullPath, content)
    c.success({
      title: 'Created file',
      message: c.link(fullPath, `file://${fullPath}`),
      padding: 2,
    })
  })
}
