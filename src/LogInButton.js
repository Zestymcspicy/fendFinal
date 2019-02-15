import React from 'react';



export default function LogInButton(props){



  return(
    <div className="login-text">
    {props.loggedIn?
      <div>
        <span>Hello {this.props.userName}</span>
        <button>Logout</button>
      </div>
      :
      <button
      onClick={props.toggleLogInOpen}
      >Login/SignUp
      </button>
    }
    </div>
)}
