import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ( { onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect( () => {

        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ( { pathname: nextPathName }) => {
                const { pathname } = history.location;

                if (pathname !== nextPathName) {
                    history.push(nextPathName);
                }
            },
            initialPath: history.location.pathname,
            onSignIn,
        });

        history.listen(onParentNavigate);
    }, []);

    return <dev ref={ref} />;
}