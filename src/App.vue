<template>
  <app-header />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component">
        <!-- ghost component, registered by Vue, does not render anything on its own,
            can be used for loading a component dynamically
            component it renders = the component we pass-->
      </component>
    </transition>
  </router-view>
  <!-- grabbing the slot property as we need access to the components that are being swaped -->

    <!-- job = load the component we registered with the path that is currently being visited -->
    <!-- this component will automatically know which component to load where based
         on the records created in the router -->
    <!-- This component will be replaced with the correct component associated with the path -->

  <app-player />

  <auth-modal />
</template>

<script>
import AppPlayer from '@/components/Player.vue';
import AppHeader from '@/components/Header.vue'; // not only header as html had a header tag
import AuthModal from '@/components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() { // lifecyclw function
    this.$store.dispatch('init_login');
  },
};
</script>

<style>
.fade-enter-from{
  opacity: 0;
}

.fade-enter-active{
  transition: all 0.5s linear;
}

.fade-leave-to{
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
