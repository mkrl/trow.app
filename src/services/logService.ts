/* eslint-disable @typescript-eslint/no-explicit-any */
import { Console } from 'console'

const isDebug = window.location.host.includes('debug')
type CallbackTypes = Console['log'] | Console['warn'] | Console['error']

const baseLog = (callback: CallbackTypes, ...args: any[]): void => {
    if (process.env.NODE_ENV === 'development' || isDebug) callback(...args)
}

export default {
    log: (...args: any[]): void => baseLog(console.info, ...args),
    warn: (...args: any[]): void => baseLog(console.warn, ...args),
    error: (...args: any[]): void => baseLog(console.error, ...args),
}
