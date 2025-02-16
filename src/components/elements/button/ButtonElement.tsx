import { FunctionalComponent, ComponentChild, h } from 'preact'
import style from './style.module.css'
import cn from 'classnames'

interface ButtonElementInterface {
    size?: 'sm' | 'md' | 'l' | 'xl'
    isBlock?: boolean
    onClick?: () => void
    disabled?: boolean
    children: ComponentChild
}

const ButtonElement: FunctionalComponent<ButtonElementInterface> = ({
    size = 'md',
    isBlock,
    onClick,
    children,
    disabled = false,
}: ButtonElementInterface) => (
    <button
        role="button"
        class={cn(style.button, style[size], isBlock && style.block)}
        onClick={onClick ? onClick : undefined}
        disabled={disabled}
    >
        {children}
    </button>
)

export default ButtonElement
