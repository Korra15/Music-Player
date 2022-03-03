// importing a specificmodule from the firebase library called app
// app package = core of firebase sdk
// firebase module == broken up into packages
// firebase allows multiple apps to be connected to a project
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDLxJjlDeztAMP7c7MZ8OJkxBs8KhhA5Ag', // how we connect to firebase
  authDomain: 'music-ba46b.firebaseapp.com', // URL where we can send the authentication info
  projectId: 'music-ba46b',
  storageBucket: 'music-ba46b.appspot.com',
  // bucket is used to describe the location where the files are stored
  appId: '1:576465139946:web:10bb9e88b6ddb90e9b3f93',
};

// Initialize Firebase by connecting to it
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); // value = object returned by the firebase.auth function
const db = firebase.firestore();
// firestore function returns an obj with methods & properties for interacting with the db

const storage = firebase.storage();
// ll tasks related to storage can be found under this method

const usersCollection = db.collection('users');
// value = function returns object of methods & properties for working with the user's collection
const songsCollection = db.collection('songs');

const commentsCollection = db.collection('comments');

export { // named exports
  auth,
  db,
  usersCollection,
  storage, // obj exposes the cloud storage functions to our components
  songsCollection, // ref for the songs collection
  commentsCollection,
};

// creating references to the auth and forestore services then we'll export the references
// allows any componenet to access the service without having to create a reference itself
