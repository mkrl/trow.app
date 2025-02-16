import { hydrate, prerender as ssr } from 'preact-iso';

import './style.css'
import App from './components/app'

if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
    return await ssr(<App {...data} />);
}
