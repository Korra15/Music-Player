import { createApp } from 'vue';
import App from './App.vue';

// vue router module comes packaged in a form of a plugin
// to use it - we import it
import router from './router';

import store from './store'; // store module being imported - onject that is returned can be used to register our store as a plugin
import VeeValidatePlugin from './plugins/validation';
import { auth } from './includes/firebase';
import './assets/tailwind.css';
import './assets/main.css';

let app;
// to check is the app has already been initialized or not

// 1 arg = callback fun to call when the event is emitted
auth.onAuthStateChanged(() => {
  // if it has been initialized we will not need to do it again
  if (!app) {
    app = createApp(App);

    app.use(store); // being registered as a plugin, exposes methods for working with the store

    app.use(router);
    // this plugin will expose the methods and properties interactindg with the router
    // settings are configures in another file

    app.use(VeeValidatePlugin);
    // registering plugins must be performed before mounting the instance

    app.mount('#app');
  }
});

// loaded firebase to check if the user is authenticated when the application stats
