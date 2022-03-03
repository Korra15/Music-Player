// state managed here
// vuex library configuration - used on a global level
// store = container for our data (object that contains our data)
// store object - keeps track of our data - restricts how data is changed
// store object = defined when we register the store
// when we define logic that will affect the state then we define it in the store

import { createStore } from 'vuex';
// createStore function being imported

import { auth, usersCollection } from '@/includes/firebase';
// import the destructured function only - the regerence
// @ char = path to src directory

export default createStore({
  // returns an object that acts as a container for our data
  // passing in 4 additional objects
  state: { // where to add data - any data == globally available to other components
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: { // must come in the form of a function inside this object
    toggleAuthModal: (state) => { // used arrow functions
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },

  getters: {
    // get_authModalShow: (state) => state.authModalShow,
  },

  actions: {
    async register({ commit }, payload) {
      // async keyword as performing async requests inside the function
      // make request to the auth and firestore services
      /*  ctx parameter = obj that referneces the store itself
          allow us to access the state and mutations */

      const userCred = await auth.createUserWithEmailAndPassword(
        // to initiate a request
        payload.email, payload.password,
      );

      // add funtion adds a document to the collection - (await usersCollection.add({}))
      // return a promise
      // doc() fun returns a document
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      // 1 arg = obj of properties to update on the profile in the Auth service
      // async task = await keyword added to wait for the response
      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit('toggleAuth');
      // commit fun = allow to commit a mutation
      // arg = name of the mutation to commit
    },
    init_login({ commit }) {
      // 1st = to retrieve the current authentication status from firebase
      const user = auth.currentUser;

      // 2nd = to check if the user is logged in based on the value retrieved
      /*  if yes = commit mutation to change state (thus an action),
          else do nothing */
      if (user) {
        commit('toggleAuth');
      }
    },
    async login({ commit }, payload) {
      // send request to firebase with the payload data
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      // async request

      // if req = success we will commit a mutaion to log the user inside the state
      commit('toggleAuth');
    },

    // action for redirection also
    async signout({ commit }, payload) {
      // context object is destructured to grab the commit function
      await auth.signOut();
      // clear credentials from the application strorage

      commit('toggleAuth');
      // commit a mutation

      if (payload.meta.requiresAuth) {
        payload.push({ name: 'home' });
      }
    },
  },
  // modules: {
  // },
});
