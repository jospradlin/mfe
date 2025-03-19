import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [ initialPath ],
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);  

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
    const devRoot = document.querySelector('#_auth-root');

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory(0), initialPath: '/auth/signin' });
    }
}

// We are running through container
//      and we should export mount function
export { mount };