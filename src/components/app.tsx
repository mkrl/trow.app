import { FunctionalComponent, h } from 'preact'
import Header from './header/HeaderComponent'
import Home from '../views/home/HomeContainer'
import LayoutComponent from './layout/main/LayoutComponent'

const App: FunctionalComponent = () => {
    return (
        <LayoutComponent HeaderComponent={Header}>
            <Home />
        </LayoutComponent>
    )
}

export default App
