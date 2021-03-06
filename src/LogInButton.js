import React from 'react';
import './LogInButton.css';


export default function LogInButton(props){
let name;
if(props.user) {
  if(props.user.displayName!==null){
    name=props.user.displayName
    } else {
    name = props.user.email;
  }
}

  return(
    <div className="login-text">
    {props.user?
      <div className="user-logged-in">
        <span className="user-greeting">Hello {name}</span>
        <button
          onClick={props.logout}>
          Logout
        </button>        
      </div>
      :
      <button
      onClick={props.toggleLogInOpen}
      >Login/SignUp
      </button>
    }
    </div>
)}
