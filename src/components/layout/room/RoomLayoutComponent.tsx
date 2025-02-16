import { ComponentChildren, FunctionalComponent, h } from 'preact'
import style from './style.module.css'

interface RoomLayoutInterface {
    SidebarComponent: FunctionalComponent
    children: ComponentChildren
}

const RoomLayout: FunctionalComponent<RoomLayoutInterface> = ({
    SidebarComponent,
    children,
}: RoomLayoutInterface) => (
    <div class={style.container}>
        <SidebarComponent />
        <section class={style.content}>{children}</section>
    </div>
)

export default RoomLayout
