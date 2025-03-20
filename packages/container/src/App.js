import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import { LinearProgress } from '@material-ui/core';

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

// So we are switching the creation of the Browser History, to an alternative way of creating it via the generic Router component
// - Here we craete the history object, but still making sure it's Browser History and not Memory History
// - This just makes it a lot easier (as per the lecturer) to get access fro the history component on the same page as where we
//   implement the Browser History
// - Lower down we then replace the <BrowserRouter> tags with <Router> tags and passing this this history object to it
// - This will bring as back to Browser History pattern (because the history object was created with "createBrowserHistory()"), but
//   with the added benefit that we have access to the history object
const history = createBrowserHistory();

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    // Passing the "isSignedIn" state property to the useEffect hook, will make the callback function (1st argument to useEffect)
    //  run each time isSignedIn changes
    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<LinearProgress />}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path='/dashboard'>
                                {!isSignedIn && <Redirect to="/auth/signin" />}
                                <DashboardAppLazy />
                            </Route>
                            <Route path='/' component={MarketingAppLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};

export default App;