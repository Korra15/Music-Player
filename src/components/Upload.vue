<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
            border-gray-400 text-gray-400 transition duration-500 hover:text-white
            hover:bg-green-400 hover:border-green-400 hover:border-solid"
            :class="{ 'bg-green-400 border-gree-400 border-solid': is_draggedOver }"
            @drag.prevent.stop=""
            @dragstart.prevent.stop=""
            @dragend.prevent.stop="is_draggedOver = false"
            @dragover.prevent.stop="is_draggedOver = true"
            @dragenter.prevent.stop="is_draggedOver = true"
            @dragleave.prevent.stop="is_draggedOver = false"
            @drop.prevent.stop="upload($event)">
          <h5>Drop your files here</h5>
        </div>
        <input type="file" multiple @change="upload($event)"/>
        <hr class="my-6" />

        <div class="mb-4" v-for="upload in uploads" :key="upload.name">
          <div class="font-bold text-sm" :class="upload.textClass">
            <i :class="upload.icon"> </i> {{ upload.name }}
          </div>

          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div class="transition-all progress-bar"
              :class="upload.variant"
              :style="{ width : upload.currentProgress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// upload component = child of the manage component
import { storage, auth, songsCollection } from '@/includes/firebase';

export default {
  name: 'Upload',
  data() {
    return {
      is_draggedOver: false, // in data as its value only affects the current component
      uploads: [],
    };
  },
  props: ['addSong'], // accesssible via the this keyword
  methods: {
    upload($event) {
      this.is_draggedOver = false;

      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];
      // convert object into an array - spreading obj properties into an array
      // spread operator used as the property will always be an object

      files.forEach((file) => { //  callback fun passed in (index, array are all args)
        if (file.type !== 'audio/mpeg') { // file type checking at both front & back end
          return;
        }

        if (!navigator.onLine) {
          this.uploads.push({
            task: {}, // used to get info about the download
            currentProgress: 100, // set progressbar width
            name: file.name,
            variant: 'bg-red-400', // change progressBar color
            icon: 'fas fa-times',
            textClass: 'text-red-400',
          });
          return;
        }

        // root storage reference
        const storageRef = storage.ref();
        // ref to storage created, show the path in our storage
        const SongsRef = storageRef.child(`songs/${file.name}`); // child reference for sub-directory
        // child function create a path relative to the parent reference
        // purpose of reference - tell firebase where we like to store the file
        const task = SongsRef.put(file); // initialize the upload process
        // returns an object that emits events we can listen to during the upload

        const uploadIndex = this.uploads.push({

          task,
          currentProgress: 0,
          name: file.name,
          variant: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin', // settng the icon property to the css classes
          // template uses an icon set = Font Awesome
          textClass: '', // color changes on success or failure
        }) - 1;

        // let's us listen to events on the object
        task.on('state_changed',
          (snapshot) => { // 1st fun = handling progress of the upload
            // snapshot obj = contain info about the current upload - current status of upload
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // calculation to get the % of how much has been uploaded so far
            this.uploads[uploadIndex].currentProgress = progress;
          },

          (error) => { // 2nd fun = used for errors
            // uploadIndex used to get the correct object that received an error
            this.uploads[uploadIndex].variant = 'bg-red-400';
            this.uploads[uploadIndex].icon = 'fas fa-times';
            this.uploads[uploadIndex].textClass = 'text-red-400';
            console.log(error);
          },

          async () => { // 3rd fun = called if the upload was a success
            const song = { // object representating data to be stored in the db
              uid: auth.currentUser.uid, // currentUser property = an obj showing the logged in user
              displayName: auth.currentUser.displayName,
              originalName: task.snapshot.ref.name,
              modifiedName: task.snapshot.ref.name,
              // to modif name 2 req to firebase need to be made =
              // 1 to db and other to the storage bucket
              genre: '',
              commentCount: 0,
            };

            song.url = await task.snapshot.ref.getDownloadURL();
            // function to return the public url to the file after it is created
            // function returns a promise

            const songRef = await songsCollection.add(song);
            // returns a doc ref not a snapshot

            const songSnapshot = await songRef.get();
            // use ref to create snapshot by calling the get function
            // returns a promise

            // this.addSong(songRef);
            // passing  a doc to be accepted by a function awaiting a snaphot
            this.addSong(songSnapshot);

            this.uploads[uploadIndex].variant = 'bg-green-400';
            this.uploads[uploadIndex].icon = 'fas fa-check';
            this.uploads[uploadIndex].textClass = 'text-green-400';
          });
      });
      // console.log(files);
    },

    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel(); // function ceases upload operations to firebase
      });
    },

    // beforeUnmount() {
    //   // run before the component is unmounted
    //   this.uploads.forEach((upload) => {
    //     upload.task.cancel(); // function ceases upload operations to firebase
    //   });
    // },
  },
};
</script>
