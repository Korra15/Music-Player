/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    // does two things:
    // 1) Register the service worker - to let th ebrowser know that we want to run backgrnd tasks
    // 2) starts workbox - 2 args:
    // where the service worker can be found
    // obj of options for configuring workbox

    ready() { // lifecycle function - event triggered
      console.log(
        'App is being served from cache by a service worker.\n'
        + 'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered() {
      // runs only once
      console.log('Service worker has been registered.');
    },
    cached() {
      // runs when file is cached(asset files are cached)
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
