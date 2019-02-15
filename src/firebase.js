import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFzxEGsgBqjiMbjiaa14KGvEHpF314SmU",
    authDomain: "grand-quarter-223106.firebaseapp.com",
    databaseURL: "https://grand-quarter-223106.firebaseio.com",
    projectId: "grand-quarter-223106",
    storageBucket: "grand-quarter-223106.appspot.com",
    messagingSenderId: "976725373485"
  };
  firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
