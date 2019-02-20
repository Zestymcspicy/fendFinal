import React from 'react';
import { db, dbAddUser } from './firebase.js';
import './FavoriteButton.css';


export default function FavoriteButton(props){

const dbToggleFavorite = (id) => {
  if (props.user!==null) {
    db.collection("users").doc(props.user.uid).get().then(function (doc) {
      doc = doc.data()
      let newFavorites = [];
      let newDoc = doc;
      if(doc.favorites.some(x => x===id)) {
        newFavorites = doc.favorites.filter(x=> x!==id);
      } else {
        newFavorites = [...newDoc.favorites, id];
      }
      newDoc.favorites = newFavorites;
      props.setNewFavorites(newFavorites);
      db.collection("users").doc(props.user.uid).set(newDoc)
      })
    }
}

const isFavoriteClass = props.isFavorite?`isFavorite`:`isNotFavorite`;
const isFavoriteText = props.isFavorite?`un-Favorite`:`Favorite`;
  return(
    <div className="button-container">
      {props.user?"":<span className="must-be-span">You must be logged in to favorite/un-favorite</span>}
      <button
        id="favorite-button"
        className={isFavoriteClass}
        onClick={() => dbToggleFavorite(props.markerId)}
        >{isFavoriteText}
      </button>
    </div>
  )

}
