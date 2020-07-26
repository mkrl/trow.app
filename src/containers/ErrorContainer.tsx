import { FunctionalComponent, h } from 'preact'
import useError from '../hooks/useError'
import ErrorComponent from '../components/error/ErrorComponent'

const ErrorContainer: FunctionalComponent = () => {
    const error = useError()
    return <ErrorComponent text={error} />
}

export default ErrorContainer
