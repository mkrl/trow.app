import {
    FunctionalComponent,
    ComponentChildren,
    ComponentType,
    Fragment,
    h,
} from 'preact'
import * as style from './style.css'

interface LayoutInterface {
    children: ComponentChildren
    HeaderComponent: ComponentType
}

const LayoutComponent: FunctionalComponent<LayoutInterface> = ({
    HeaderComponent,
    children,
}: LayoutInterface) => (
    <Fragment>
        <HeaderComponent />
        <main className={style.home}>{children}</main>
    </Fragment>
)

export default LayoutComponent
