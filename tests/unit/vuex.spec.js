import { createStore } from 'vuex';
// no need for any component as we test the store in isolation

import auth from '@/store/modules/auth';
import player from '@/store/modules/player';

import { cloneDeep } from 'lodash';
// cloneDeep fun - creates a copy of an object that doesn't get referenced to the original object

jest.mock('@/includes/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
    // function we are mocking returns a promise
  },
}));

describe('Vuex Store', () => {
  test('toggleAuth mutation sets userLoggedIn to true', () => {
    const clonedAuth = cloneDeep(auth);
    // deals with the leaking issues b/w tests
    // after this completely isolated

    const store = createStore({
      modules: {
        auth: clonedAuth,
      },
    });

    // 2 assertions:

    // first = checks the default state
    // assertion to check if the state property = false
    expect(store.state.auth.userLoggedIn).not.toBe(true);

    // commit the mutation
    store.commit('toggleAuth');

    // second = check the state after the mutation was commited
    expect(store.state.auth.userLoggedIn).toBe(true);
  });

  test('login action sets userLoggedIn to true', async () => {
    // test we write = checks if the action is committing the toggle auth mutation
    // dealing with a promise in this code

    expect.assertions(2);
    // if 2 assertions are not made jest will fail the test

    // clone the store - not share it across multiple tests
    const clonedAuth = cloneDeep(auth);
    const store = createStore({
      modules: {
        auth: clonedAuth,
      },
    });

    expect(store.state.auth.userLoggedIn).toBe(false);
    await store.dispatch('login', { email: '', password: '' });
    // triggers the action

    expect(store.state.auth.userLoggedIn).toBe(true);
  });

  test('playing returns true if audio is playing', () => {
    // getters return value
    // can be tested by sending in a mock object - keeps the function isolated
    const state = {
      sound: {
        playing: () => true,
      },
    };

    const result = player.getters.playing(state);
    expect(result).toEqual(true);
  });
});
