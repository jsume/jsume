import a from 'ansis'
import tlink from 'terminal-link'

/**
 * console utils
 */
export default {
  error(options: { padding?: number, title: string, message?: string }) {
    const { padding = 0, title, message } = options
    const paddingStr = ' '.repeat(padding)
    let errorStr = `${paddingStr}${a.redBright`✖`} ${a.white`${title}`}`

    if (message !== undefined) {
      errorStr += `${a.white`:`} ${a.white.dim`${message}`}`
    }
    console.error(errorStr)
  },
  success(options: { padding?: number, title: string, message?: string }) {
    const { padding = 0, title, message } = options
    const paddingStr = ' '.repeat(padding)
    let successStr = `${paddingStr}${a.greenBright`✔`} ${a.white`${title}`}`

    if (message !== undefined) {
      successStr += `${a.white`:`} ${a.white.dim`${message}`}`
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
