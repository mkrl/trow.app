import {
    FunctionalComponent,
    ComponentChildren,
    ComponentType,
    Fragment,
    h,
} from 'preact'
import style from './style.module.css'
import ErrorContainer from '../../../containers/ErrorContainer'

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
        <ErrorContainer />
        <main className={style.home}>{children}</main>
    </Fragment>
)

export default LayoutComponent
