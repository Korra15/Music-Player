import { auth, usersCollection } from '@/includes/firebase';
// import the destructured function only - the regerence
// @ char = path to src directory

export default {
  // namespaced: true,
  // // enables namespacing for the entire module
  // // limited to thier scope(own state and not the rootState)

  state: { // where to add data - any data == globally available to other components
    authModalShow: false,
    userLoggedIn: false,
  },

  getters: {
    // get_authModalShow: (state) => state.authModalShow,
  },

  mutations: { // must come in the form of a function inside this object
    toggleAuthModal: (state) => { // used arrow functions
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
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
};
