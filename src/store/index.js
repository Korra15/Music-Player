// state managed here
// vuex library configuration - used on a global level
// store = container for our data (object that contains our data)
// store object - keeps track of our data - restricts how data is changed
// store object = defined when we register the store
// when we define logic that will affect the state then we define it in the store

import { createStore } from 'vuex';
// createStore function being imported

// import auth from './modules/auth';
// import player from './modules/player';
import modules from './modules';

export default createStore({
  // returns an object that acts as a container for our data
  // passing in 4 additional objects
  // modules: {
  //   auth, player,
  // },
  modules,
});

// RootState obj
