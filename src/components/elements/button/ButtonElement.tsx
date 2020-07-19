import { FunctionalComponent, ComponentChild, h } from 'preact'
import * as style from './style.css'
import cn from 'classnames'

interface ButtonElementInterface {
    size?: 'sm' | 'md' | 'l' | 'xl'
    isBlock?: boolean
    onClick?: () => void
    children: ComponentChild
}

const ButtonElement: FunctionalComponent<ButtonElementInterface> = ({
    size = 'md',
    isBlock,
    onClick,
    children,
}: ButtonElementInterface) => (
    <button
        role="button"
        class={cn(style.button, style[size], isBlock && style.block)}
        onClick={onClick ? onClick : undefined}
    >
        {children}
    </button>
)

export default ButtonElement
