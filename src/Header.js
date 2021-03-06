import React from 'react';
import hamburgerIcon from './hamburger.png'
import LogInButton from './LogInButton'
import './Header.css'


export default function Header (props){

    return(
      <header>
        <button
        id="hamburger"
        onClick={props.slideMenu}
        ><img src={hamburgerIcon} alt="hamburger" height="35" width="32"/></button>
        <h1>LFKoffee</h1>
        <LogInButton
        logout={props.logout}
        user={props.user}
        toggleLogInOpen={props.toggleLogInOpen}/>
      </header>
)}
