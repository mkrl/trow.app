import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'
import { Error } from '../../services/errorService'

type ErrorComponent = {
    text: Error
}

const ErrorComponent: FunctionalComponent<ErrorComponent> = ({
    // eslint-disable-next-line react/prop-types
    text,
}: ErrorComponent) => (text ? <div class={style.error}>{text}</div> : null)

ErrorComponent.defaultProps = {
    text: null,
}

export default ErrorComponent
