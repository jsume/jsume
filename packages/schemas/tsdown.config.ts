import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  format: ['esm', 'cjs'],
  fixedExtension: true,
  platform: 'neutral',
  exports: {
    customExports(exports) {
      exports['./*.json'] = './dist/*.json'
      return exports
    },
  },
})
