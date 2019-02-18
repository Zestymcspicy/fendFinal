import React from 'react';
import { dbToggleFavorite } from './firebase.js';

export default function FavoriteButton(props){

  return(
    <button
    onClick={() => dbToggleFavorite(props.markerId)}
    >Favorite
    </button>
  )

}
