<template>

  <!-- <div>
    {{ $route.params.id }}
  </div> expression inside -->

  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)">
    </div>
    <div class="container mx-auto flex items-center">
      <button type="button" class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full
        focus:outline-none">
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <div class="text-3xl font-bold"> {{ song.modifiedName }} </div>
        <div> {{ song.genre }} </div>
      </div>
    </div>
  </section>

  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Comments (15)</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div class="text-white text-center font-bold p-4 mb-4"
          v-if="commentShowAlert"
          :class="commentAlertVariant">
          {{ commentAlertMessage }}
        </div>

        <vee-form :validation-schema="schema" @submit="addComment"
          v-if="userLoggedIn">
          <vee-field as="textarea" name="comment"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
              duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."> </vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
          <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600"
            :disabled="commentInSubmission">
            Submit
          </button>
        </vee-form>
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>

  <!-- Comments -->
  <ul class="container mx-auto">
    <li class="p-6 bg-gray-50 border border-gray-200"
      v-for="comment in comments" :key="comment.docId">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.name}}</div>
        <time>{{ comment.datePosted }}</time>
      </div>

      <p> {{ comment.content }}</p>
    </li>
    <!-- we're using the names given to properties to access the proper values in the database -->
  </ul>

</template>

<script>
import { songsCollection, auth, commentsCollection } from '@/includes/firebase';
// need it to request song data from firebase

import { mapState } from 'vuex';
// need mapState function to map the state to the computed property

export default {
  name: 'Song',
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3',
      },
      commentInSubmission: false,
      commentShowAlert: false, // to toggle the alert box
      commentAlertVariant: 'bd-blue-500',
      commentAlertMessage: 'Please wait! Your comment is being submitted',
      comments: [],
    };
  },

  computed: {
    ...mapState(['userLoggedIn']),
    // function expects an array of state properties we will like to map
  },

  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
    // doc function will retrieve a single document by its ID
    // where fun could also be used = more flexible - can return multiple docs

    if (!docSnapshot.exists) {
      // to make sure the page does not get loaded when the song is invalid
      this.$router.push({ name: 'home' });
      return;
    }

    this.song = docSnapshot.data();
    this.getComments();
    // code outsources
  },

  methods: {
    async addComment(values, { resetForm }) {
      // async as a db opertaion
      // values arg represents the fields we have in the form

      // context obj(2nd arg) contains the methods and properties about our form
      // can be used to reset the form - destructured to get that function

      // disable the submit button
      this.commentInSubmission = true;
      this.commentShowAlert = true;
      this.commentAlertVariant = 'bg-blue-500';
      this.commentAlertMessage = 'Please wait! Your comment is being submitted';

      const comment = {
        // hold data we will like to store in the db
        content: values.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id, // help associate the comment with the song
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);
      // await as it is a promise

      this.getComments();

      this.commentInSubmission = false;
      this.commentAlertVariant = 'bg-green-500';
      this.commentAlertMessage = 'Comment Added!';

      resetForm();
      // this function will reset the values in the form to their original values
    },

    async getComments() {
      // 2 situations to retrieve the comments
      // when component is first loaded and next when a comment is submitted

      const snapshots = await commentsCollection.where(
        'sid', '==', this.$route.params.id,
      ).get();

      this.comments = [];
      // reset to empty to avoid redundant comments

      snapshots.forEach((doc) => [
        this.comments.push({
          docId: doc.id,
          ...doc.data(),
          // spread operator used as this will return an object of properties
        }),
        // push method on the comments data property
      ]);
      // accepts a callback fun - provided the current documant in the iteration
    },
  },
};
</script>
