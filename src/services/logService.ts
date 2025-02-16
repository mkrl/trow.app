const isDebug = typeof window !== 'undefined' ? window.location.host.includes('debug') : false
type CallbackTypes = Console['log'] | Console['warn'] | Console['error']

const baseLog = (callback: CallbackTypes, ...args: any[]): void => {
    if (import.meta.env.PROD === false || isDebug) callback(...args)
}

export default {
    log: (...args: any[]): void => baseLog(console.info, ...args),
    warn: (...args: any[]): void => baseLog(console.warn, ...args),
    error: (...args: any[]): void => baseLog(console.error, ...args),
}
