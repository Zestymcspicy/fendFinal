import firebase from 'firebase'
require('firebase/firestore')
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
var db = firebase.firestore();




export const dbAddUser = (email, displayName, id) => {
  const idString = id.toString();
  db.collection('users').doc(idString).set({
    email: email,
    favorites : []
})
.then(function(docRef) {
  console.log("Document written with ID", docRef.id);
}).catch(function(error) {
  console.error(error);
})
}

export const dbToggleFavorite = venueId => {
  console.log(venueId);
}

export const dbGetFavorites = id => {
    const docRef = db.collection('users').doc(id);
    docRef.get().then(function(doc) {
      if(doc.exists) {
        console.log(doc.data());
      } else {
        console.log("no such document!")
      }
    }).catch(function(error) {
      console.log(error);
    })
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
