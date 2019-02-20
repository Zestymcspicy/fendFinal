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




export const dbAddUser = (email, displayName, id) => {
  // if(dbCheckUser(id)===false) {
  const idString = id.toString();
  if(displayName===undefined) {
    displayName = null;
  }
  db.collection('users').doc(idString).set({
    displayName : displayName,
    email: email,
    favorites : [],
    id: id
  })
}
// }

export const dbCheckUser = (id) => {
  const idString = id.toString();
  const docRef = db.collection("users").doc(idString);
  docRef.get().then(function(doc) {
    doc = doc.data();
    console.log(doc)
    if (doc.id===undefined) {
      return false;
    } else {
      return true;
    }
  }).catch(function(error) {
    console.log(error);
  })
}

// export const dbToggleFavorite = venueId => {
//   console.log(venueId);
// }




export const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
