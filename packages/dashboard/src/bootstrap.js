import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

const mount = (el) => {
    const app = createApp(Dashboard);
    // the following "mount()" method is a Vue.js method it has nothing to do with the mount() method inside which this code is
    app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
    const isStandAlone = !!document.querySelector('body[data-app-name="dashboard"]');
    if (isStandAlone) {
        mount(document.getElementById("app"));
    }
}

export { mount };