import { FunctionalComponent, h, ComponentChildren } from 'preact'
import { useEffect } from 'preact/hooks'
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
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add(style.modalOpen)
        } else {
            document.body.classList.remove(style.modalOpen)
        }
    }, [isOpen])
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