import { FunctionalComponent, h } from 'preact'
import Header from './header/HeaderComponent'
import Home from '../views/home/HomeContainer'
import LayoutComponent from './layout/main/LayoutComponent'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug')
}

const App: FunctionalComponent = () => {
    return (
        <LayoutComponent HeaderComponent={Header}>
            <Home />
        </LayoutComponent>
    )
}

export default App
