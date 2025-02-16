import { FunctionalComponent, h } from 'preact'
import style from './style.module.css'

// eslint-disable-next-line react/prop-types
const ControlGroupElement: FunctionalComponent = ({ children }) => (
    <div class={style.group}>{children}</div>
)

export default ControlGroupElement
