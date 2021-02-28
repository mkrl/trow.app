import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'
import LogoElement from '../elements/logo/LogoElement'

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <LogoElement />
        </header>
    )
}

export default Header
