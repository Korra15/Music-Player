<template>
  <main>
    <!-- <BaseButton /> -->
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">

          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus et dolor mollis, congue augue non, venenatis elit.
            Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
            sapien. Duis sed magna pulvinar, fringilla lorem eget,
            ullamcorper urna.
          </p>
        </div>
      </div>

      <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="assets/img/introduction-music.png" />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true, black: 'text-black-400'}">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <!-- Global dir = on div tag v-icon.right="'headphones-alt'" -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <AppSongItem v-for="song in songs" :key="song.docId"
            :song="song" />
          <!-- key = smtg in the obj that is unique -->
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from '@/includes/firebase';
import AppSongItem from '@/components/SongItem.vue';
import IconSecondary from '@/directives/icon-secondary';

export default {
  name: 'Home',

  components: {
    AppSongItem,
  },

  directives: {
    // property name = directive name
    // value of the property = the config object for the directive
    'icon-secondary': IconSecondary,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 25,
      pendingRequest: false,
    };
  },

  // req the data from firebase when the component is created -
  // thus created lifecycle function
  async created() {
    this.getSongs();
    // outsourcing the request to a method we can recall

    window.addEventListener('scroll', this.handleScroll);
    // event want to listen
    // scroll event = emitted whenever the user scolls
  },

  beforeUnmount() {
    // to remove the event listerner before unmounting the component
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      // responsible for checking the current scroll position of the page

      // three properties to check if the user is scrolled to the bottom of the page
      // offset height: property contains the height of the entire page
      // inner height: contains the height of the viewable area in the browser
      // = (how much of the page the user sees)
      // scroll top: contains the distance from the top od the page to the top of the viewable area

      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window; // destructuring the properties
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
      if (bottomOfWindow) {
        // console.log('Bottom of Window');
        this.getSongs();
      }
    },

    async getSongs() {
      if (this.pendingRequest) {
        // tells us if there is a req for songs already made
        // property toggles in the function
        return;
      }

      this.pendingRequest = true;

      let snapshots;

      if (this.songs.length) {
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docId) // returns snapshot
          .get(); // initiate the query

        snapshots = await songsCollection
          .orderBy('modifiedName')
          .startAfter(lastDoc) // arg = doc it should start at
          // telling db to start looking for a document after a specific document
          // fun req a snapshot of the doc it should start from
          .limit(this.maxPerPage)
          .get();
        // to initiate the query, await keyword to handle the returned promise
        // get fun = perform a get req on the collection
      } else {
        snapshots = await songsCollection // for initial query
          .orderBy('modifiedName')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        // arrow function to handle each iteration
        this.songs.push({
          docId: document.id,
          ...document.data(),
        });
      });
      this.pendingRequest = false;
    },
  },
};
</script>
