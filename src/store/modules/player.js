import { Howl } from 'howler';
// Howl object = used to create a new audio object and used to load the audio file and control it
// howler creates an object with methods and properties when new audio obj created

import helper from '@/includes/helper';

export default {
  state: {
    currentSong: {},
    sound: {},
    seek: '00:00', // current postition
    duration: '00:00',
    playerProgress: '0%',
  },

  getters: {
    playing: (state) => {
      // provided the state obj as the 1st param
      if (state.sound.playing) {
        return state.sound.playing();
      }
      // if fun = not defined then the there is no audio playing

      return false;
    },
    // as we want to call the function on the sound state property
  },

  mutations: {
    newSong(state, payload) {
      state.currentSong = payload;
      // mutation updates the state
      // song data stored in a state property = currentSong

      state.sound = new Howl({
        src: [payload.url],
        // array of audio file we want to play
        // values in the array = url of the audio files
        html5: true,
        // howler req audio file with an ajax request
        // library switches to the html5 audio api to retrieve the audio file -
        // that will be loaded into the browser
      });
      // creating a new instance of the howl object when a song is added
    }, // initialized the object
    updatePosition(state) {
      // accepting state so that we can update it
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`;
    },
  },

  actions: {
    async newSong({ commit, state, dispatch }, payload) {
      if (state.sound instanceof Howl) {
        // instanceof operator used to check if the sonund object is the instance of the Howl object
        // if yes then invoke fun that pauses the current audio
        // and deletes the instance and remove it from memory
        state.sound.unload();
      }

      commit('newSong', payload);
      // using the commit fun we need to tell vuex the name of the mutation to commit
      // 2nd arg = the data we want to add to the store
      // commits a mutation
      // passing the payload received from the component to the mutation

      state.sound.play(); // to play the song

      state.sound.on('play', () => {
        // listening for the event called play
        requestAnimationFrame(() => {
          // executes only once as it does not recursively call the callback function
          dispatch('progress');
          // name of the action to dispatch
        });
        // executes a function passed into it
      });
    },

    async toggleAudio({ state }) {
      // initaially sound property = empty object thus we need to check if howl obj has been made
      if (!state.sound.playing) {
        // condition we are using = playing function is defined in the object
        // here the playing function does not get invoked
        // js sees this as if we are checking if the function exost on this oject
        return;
      }

      // here the sound state property is a howl object thus we can toggle the audio
      if (state.sound.playing()) {
        // invoking the playing function
        // returns bool
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },

    progress({ commit, state, dispatch }) {
      // 2 tasks =
      // 1st is commit the mutation for the two state properties - used in player
      // 2nd is to dispatch the progress function again
      commit('updatePosition');

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },

    updateSeek({ state, dispatch }, payload) {
      // Howler uses seek name to describe the current position of the audio
      // 2 params = 1st - state obj and the second - the payload(event object)
      // state onj as we need the methods and properties of the current audio
      // payload param need to help us calculate where to move the audio position
      // payload obj = reference to the event
      if (!state.sound.playing) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      // destructuring the obj returned by the function that
      // will give us the  info about the current elements coordinates and dimensions

      // currentTarget property = always returnes the same ele -
      // the element where the event listener is added

      // x property = represents the distance b/w the left of the doc to the left of the timeline

      // returns pos relative to the document and not the timeline width
      // we can solve this by subtracting the clicked distance
      // from the distance between the left side of the doc and the left side of the timeline

      const clickedPosX = payload.clientX - x; // shows the x coordinate of the click
      const percentage = clickedPosX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);

      // we will dispatch the progress action because we will update the position of the audio
      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
};
