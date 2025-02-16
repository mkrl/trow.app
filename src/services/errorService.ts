import logService from './logService'

export type Error = string | null

type ErrorUpdater = (state: Error) => void

const ERROR_TIMEOUT = 12000

interface ErrorServiceInterface {
    setErrorUpdater: (updater: ErrorUpdater) => void
    setError: (newError: Error, keepOnScreen?: boolean) => void
}

const errorService = ((): ErrorServiceInterface => {
    let errorUpdater: ErrorUpdater = newError => {
        logService.error(newError)
    }
    let errorTimeout: number

    const _clearError = (error: Error): void => {
        logService.error(error)
        errorTimeout = window.setTimeout(
            () => errorUpdater(null),
            ERROR_TIMEOUT
        )
    }

    const _setError = (newError: Error, keepOnScreen?: boolean): void => {
        window.clearTimeout(errorTimeout)
        errorUpdater(newError)
        if (!keepOnScreen) {
            _clearError(newError)
        }
    }
    const _setErrorUpdater = (newUpdater: ErrorUpdater): void => {
        errorUpdater = newUpdater
    }

    return {
        setErrorUpdater: _setErrorUpdater,
        setError: _setError,
    }
})()

export default errorService
