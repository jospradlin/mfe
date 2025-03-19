import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
    const history = defaultHistory || createMemoryHistory();

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App history={history} />, el);  

    return {
        onParentNavigate({ pathname: nextPathName }) {
            const { pathname } = history.location

            if (pathname !== nextPathName) {
                history.push(nextPathName);
            }

        }
    }
};


// If we are in DEV and Isolation
//      Call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-root');

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory(0) });
    }
}

// We are running through container
//      and we should export mount function
export { mount };