import { FunctionalComponent, h } from 'preact'
import style from './style.module.css'

const SeparatorElement: FunctionalComponent = () => (
    <hr className={style.separator} />
)

export default SeparatorElement
