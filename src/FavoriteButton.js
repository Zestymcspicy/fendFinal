import React from 'react';
import { dbToggleFavorite } from './firebase.js';
import './FavoriteButton.css'

export default function FavoriteButton(props){
const isFavoriteClass = `isFavorite`
const isFavoriteText = `Favorite`
  return(
    <button
    id="favorite-button"
    className={isFavoriteClass}
    onClick={() => dbToggleFavorite(props.markerId)}
    >{isFavoriteText}
    </button>
  )

}
