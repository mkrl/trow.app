import { FunctionalComponent, h } from 'preact'
import Header from './header'
import Home from '../views/home'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug')
}

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Header />
            <Home />
        </div>
    )
}

export default App
