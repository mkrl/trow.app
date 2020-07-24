import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'

// eslint-disable-next-line react/prop-types
const ControlGroupElement: FunctionalComponent = ({ children }) => (
    <div class={style.group}>{children}</div>
)

export default ControlGroupElement
