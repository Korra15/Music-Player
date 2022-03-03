import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';
import store from '@/store';
import Song from '@/views/Song.vue';

// navigation guards = protecting our routes - perform checks on req before rendering a component
// prevents anu unathorized user to access a particular route without proper permissions
// guards = functions - 3 ways
// 1. Global guard - run on every route
// 2. Route specific routes - guards to specific routes
// 3. Guards defined inside components
// resolution flow = order of the guard function that will run

// named routes = routes - assigned names to reference them in other parts of the application
// route with name == referenced by its name rather than its path

const routes = [
  {
    name: 'home', // allow to assign name to the route record
    path: '/', // URL part after the domain
    component: Home, // value = render contents of this component
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'manage',
    // alias: '/manage', // alias = additional path that renders the same component
    // allow component to be rendered for a different path and not redirect it
    path: '/manage-music',

    meta: { // contain a set of key value pairs
      requiresAuth: true,
    },

    component: Manage,
    // guard defined on the record = guard runs when the route is visited
    beforeEnter: (to, from, next) => {
      // console.log('Manage Router Guard');
      next(); // to let the routere render the component
    },
  },
  {
    // preferred as it is better for search engines to index the new urls as fast as possible
    // redirection to another page (for new paths, if we change old path names)
    path: '/manage',
    redirect: { name: 'manage' }, // this property allows us to redirect to a different path
  },
  {
    name: 'song',
    path: '/song/:id', // : tells the router the segment is dynamic
    component: Song,
  },
  {
    // catch-all routes - checked last
    path: '/:catchAll(.*)*',
    // regEx value
    // * char = cathc a path that doesn't exist within the records
    redirect: { name: 'home' },
  },
];

const router = createRouter({ // returns an object
  // router performs exact and partical matching
  // partial match = when the url and path do not match completely
  // == good for sub menu navigation

  // exact match = path and url match exactly an active class is applied

  history: createWebHistory(process.env.BASE_URL),
  // can be used to enable histor mode in the browser
  // history API = lets us interact with the browser history
  // can be used to change the url in the address bar without having to refresh the page
  // the value = an object with how we plan to use the history API to navigate the app

  routes,
  // property = array of paths the user can access in our applicaion
  // array of objects - where each obj represent a route - route record

  linkExactActiveClass: 'text-yellow-500',

});

// available after the instance of the router is created
// applies to all routes registered in the application
// 1 arg = callback function - called whenever a request is made
router.beforeEach((to, from, next) => {
  // console.log('Global Guard');
  // console.log(to.matched);
  // to object represents the route the user is navigating to
  // accessing property called matched -
  // array containing the list of records that matches the path the user is visiting

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    // record param = current item in the iteration
    next();
    return;
  }

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

// router object = being used to register a new plugin in the main.js file
// router obj exported and will be registered in the vue instance
// this obj enables routing for the application
export default router;
