<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4"
        :to="{name: 'home'}" exact-active-class="no-active">
      <!-- the router library prioritizes this class (exact-active-class) over the global class -->
        Music
      </router-link>
      <!-- forward slash appends the path to the domain otherwise append to the current path -->

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
              <router-link class="px-2 text-white" :to="{name: 'about'}">
                <!-- can also add path as field in obj -->
                About</router-link>
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              Login / Register</a>
          </li>
          <template v-else> <!-- help render multipl list items -->
            <li>
              <router-link class="px-2 text-white" :to="{name: 'manage'}">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signout">
                 Logout</a>
            </li>
          </template>
        </ul>

        <!-- translation menu on the right side(ml-auto-class) -->
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
              {{ currenctLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
// { imports a function}
// Will be registered locally

// methods: {
//   toggleAuthModal() { not reusable - only available in the header component
//      this.$store.state.authModalShow = !this.$store.state.authModalShow;
//      //retrieving a state property by accessing its state object followed by its name
//      console.log(this.$store.state.authModalShow);
//   }

import { mapMutations, mapState } from 'vuex';
// mapState function will generte getter functions for the state properties

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['userLoggedIn']),
    // function requires to pass an array of state properties we want getter function for
    currenctLocale() {
      return this.$i18n.locale === 'hi' ? 'Hindi' : 'English';
    },
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),

    // toggleAuthModal() {
    //   // defining a function calling the function that will perform the actual mutation
    //  this.$store.commit('toggleAuthModal');
    // commit function allows us to call a mutation function from the store
    // },

    // disatch the action from the header component
    // signout() {
    //   this.$store.dispatch('signout');
    // },  OR
    // ...mapActions(['signout']), // array of actions we want to map

    // not an action as does not affect the state here
    // here as an action - to demonstrate only

    signout() {
      // passing the router object as part of payload to prevent dependency cycle
      this.$store.dispatch('signout', {
        router: this.$router,
        route: this.$route,
      }); // dispatch an action

      // if (this.$route.name === 'manage') {
      //   this.$router.push({ name: 'home' });
      // }
      // console.log(this.$route);
      // access the router object
      // pushing the next path on top of the already visited paths - history API

      // if (this.$route.meta.requiresAuth) {
      //   this.$router.push({ name: 'home' });
      // }
    },

    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'hi' ? 'en' : 'hi';
    },
  },
};
</script>
