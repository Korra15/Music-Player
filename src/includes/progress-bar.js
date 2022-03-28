import NProgress from 'nprogress';

// no router obj = no navigation guards
// can be overcomed by:
export default (router) => {
  // before router begins to load
  router.beforeEach((to, from, next) => {
    NProgress.start(); // initializes the progress bar
    next(); // to let router begin component loading
  });

  router.afterEach(NProgress.done);
};
