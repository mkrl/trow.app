import { FunctionalComponent, h, ComponentChildren } from 'preact'
import * as style from './style.css'
import cn from 'classnames'

interface ModalComponentInterface {
    children: ComponentChildren
    isOpen?: boolean
    title?: string
}

const ModalComponent: FunctionalComponent<ModalComponentInterface> = ({
    isOpen = false,
    children,
    title,
}: ModalComponentInterface) => {
    return (
        <div class={cn(style.backdrop, isOpen && style.open)}>
            <section className={cn(style.modal, isOpen && style.open)}>
                {title && <h4 class={style.title}>{title}</h4>}
                {children}
            </section>
        </div>
    )
}

export default ModalComponent
