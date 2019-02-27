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




export const dbAddUser = (user) => {
  let displayName;
  const idString= user.uid.toString();
  (user.displayName===undefined) ?
    displayName = null:
    displayName = user.displayName
  db.collection('users').doc(idString).set({
    displayName : displayName,
    email: user.email,
    favorites : [],
    id: user.uid
  })
}
// }

export const dbCheckUser = (user) => {
  const idString = user.uid.toString();
  const docRef = db.collection("users").doc(idString);
  docRef.get().then(function(doc) {
    doc = doc.data();
    if (doc===undefined||null) {
      dbAddUser(user);
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
