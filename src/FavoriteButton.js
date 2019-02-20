import React from 'react';
import { db, dbAddUser } from './firebase.js';
import './FavoriteButton.css';


export default function FavoriteButton(props){

let mustBeLoggedIn;
const dbToggleFavorite = (id) => {
  if (props.user!==null) {
    db.collection("users").doc(props.user.uid).get().then(function (doc) {
      if(doc.data()===undefined) {
        return dbAddUser(props.user.email, props.user.displayName, props.user.uid)
      }
      doc = doc.data()
      if(doc.favorites.length>0) {
        let newFavorites = [];
        let newDoc = doc;
        console.log(doc.favorites)
        doc.favorites.some(x => x===id?newFavorites=doc.favorites.filter(x=> x!==id):
        newFavorites = doc.favorites.push(id));
        newDoc.favorites = newFavorites;
        db.collection("users").doc(props.user.uid).set(newDoc)
      }
      })
} else {
  console.log("hey")
  mustBeLoggedIn = <span>You wust be logged in to do that</span>
}
}

const isFavoriteClass = props.isFavorite?`isFavorite`:`isNotFavorite`;
const isFavoriteText = props.isFavorite?`un-Favorite`:`Favorite`;
  return(
    <div>
      <button
        id="favorite-button"
        className={isFavoriteClass}
        onClick={() => dbToggleFavorite(props.markerId)}
        >{isFavoriteText}
      </button>
      {mustBeLoggedIn}
    </div>
  )

}
