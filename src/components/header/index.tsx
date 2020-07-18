import { FunctionalComponent, h } from 'preact'
import * as style from './style.css'

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <h1>Trow P2P</h1>
            <nav>
                <a href="/">Home</a>
            </nav>
        </header>
    )
}

export default Header
