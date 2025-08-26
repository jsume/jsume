import a from 'ansis'
import tlink from 'terminal-link'

/**
 * console utils
 */
export default {
  error(options: { padding?: number, title: string, message?: string }) {
    const { padding = 0, title, message } = options
    const paddingStr = ' '.repeat(padding)
    let errorStr = `${paddingStr}${a.bgRed.bold.black` ERROR `} ${a.bold.white`${title}`}`

    if (message !== undefined) {
      errorStr += `${a.bold.white`:`} ${a.white.dim`${message}`}`
    }
    console.error(errorStr)
  },
  success(options: { padding?: number, title: string, message?: string }) {
    const { padding = 0, title, message } = options
    const paddingStr = ' '.repeat(padding)
    let successStr = `${paddingStr}${a.bgGreen.bold.black` SUCCESS `} ${a.bold.white`${title}`}`

    if (message !== undefined) {
      successStr += `${a.bold.white`:`} ${a.white.dim`${message}`}`
    }
    console.info(successStr)
  },
  link(text: string, url: string) {
    return tlink.isSupported
      ? a.underline`${tlink(text, url)}`
      : text
  },
  a,
}
