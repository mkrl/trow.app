import { useState, useEffect } from 'preact/hooks'
import errorService, { Error } from '../services/errorService'

const useError = (): Error => {
    const [error, setError] = useState<Error>(null)
    useEffect(() => {
        errorService.setErrorUpdater(setError)
    }, [error, setError])

    return error
}

export default useError
