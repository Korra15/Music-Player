<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <AppUpload ref="upload" :addSong="addSong" />
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my_songs')}}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <CompositionItem v-for="(song, i) in songs" :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"/> <!-- :bind property -->
            <!-- job = display a single song -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// in views directory as this component is ment to render main content for the app

// import store from '@/store'; // to access a store in a guard we need to import it

import AppUpload from '@/components/Upload.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { songsCollection, auth } from '@/includes/firebase';
// auth to identify which user uploaded the song

export default {
  name: 'manage',
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  async created() { // life cycle function
    // ayncy lifecycle functions - vue will not wait for the code inside
    // these functions to be executed - componenet will load the template onto the page
    // even if we have an async function

    const snapshot = await songsCollection
      .where('uid', '==', auth.currentUser.uid)
      .get(); // querying the database
    // result = array of doc snapshots
    // creates the query for searching through the documents
    // function = async task
    // INITIATE THE QUERY by chaining the get function - returns the doc it finds(snapshot)

    snapshot.forEach(this.addSong);
  },

  methods: {
    updateSong(i, values) {
      // i = index of the obg to update
      // values param = form data with the name and genre of the song
      this.songs[i].modifiedName = values.modifiedName;
      this.songs[i].genre = values.genre;
    },

    removeSong(i) {
      this.songs.splice(i, 1);
      // splice funtion = remove items from an array
    },

    addSong(document) {
      // create application data,
      // merge it with the song data
      // push the merged data into the array
      const song = {
        // expects obj to be a snapshot
        ...document.data(), // data fun returns data inside the document
        docId: document.id,
      };

      this.songs.push(song);
    },

    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },

  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) { // if false
      next(); // allows the router to proceed
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      // confirm fun produces a prompt
      // it is a global function defined by the browser
      // returns a bool value
      next(leave);
    }
  },

  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   // refs obj = obj defined by vue = injected into every instance and component
  //   // contains a list of refereences reistered in our application
  //   // each obj in the ref property rep the dom ele on the page4
  //   next();
  // },

  // if this method is present then the router will run before rendering the component
  // guard fun do not have access to the methods/priorities of a component -
  // as the component has not been rendered yet - run before anu lifecycle fun do

  // beforeRouteEnter(to, from, next) {
  //   // console.log(store.state.userLoggedIn);
  //   // console.log(to, from);

  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     // redirect the user using the next function
  //     next({ name: 'home' });
  //   }
  // },
};
</script>
