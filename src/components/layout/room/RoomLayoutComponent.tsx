import { ComponentChildren, FunctionalComponent, h } from 'preact'
import * as style from './style.css'
import BoxElement from '../../elements/box/BoxElement'

interface RoomLayoutInterface {
    SidebarComponent: FunctionalComponent
    children: ComponentChildren
}

const RoomLayout: FunctionalComponent<RoomLayoutInterface> = ({
    SidebarComponent,
    children,
}: RoomLayoutInterface) => (
    <BoxElement justifyContent="between" isFullHeight isContainer>
        <SidebarComponent />
        <section class={style.content}>{children}</section>
    </BoxElement>
)

export default RoomLayout
