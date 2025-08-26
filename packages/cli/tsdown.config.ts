import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/cli.ts',
  fixedExtension: true,
  platform: 'node',
})
