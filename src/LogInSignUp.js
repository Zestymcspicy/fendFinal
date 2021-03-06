import React, { Component } from 'react';
import firebase, { auth, provider, dbAddUser, dbCheckUser } from './firebase.js';
import './LogInSignUp.css';
import GoogleButtonImage from './google-signin.png';


class LogInSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      returningUser : true,
      email : "",
      password : "",
      newEmail : "",
      newPassword : "",
      newPasswordMatch : "",
      validNewCreds : false,
    }
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleNewUserForm = this.toggleNewUserForm.bind(this);
    this.checkNewCreds = this.checkNewCreds.bind(this);
    this.newUserSubmit = this.newUserSubmit.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
  }

handleChange(e) {
  this.setState({[e.target.name]: e.target.value})
}

//email meets specs
emailSpan(text)  {
  if(text.indexOf("@")!==-1&&text.lastIndexOf(".")>text.indexOf("@")) {
    return <span className="verified">Thank You</span>
  }
    return <span className="not-verified">Please provide a valid e-mail</span>
}


//password meets specs
passwordSpan(text) {
  if(text.length<8){
    return <span className="not-verified">Password must be at least 8 characters</span>
  }
}



passwordMatchSpan(text) {
  if(text !==this.state.newPassword) {
    return <span className="not-verified">Passwords do not match!</span>
  }
}


toggleNewUserForm(e) {
    this.state.returningUser?
    this.setState({returningUser : false}):
    this.setState({returningUser : true})
}





validatedThanks() {
  if(this.state.validNewCreds){
    return(
      <div className="valid-div">
        <span>Thank You!</span>
        <button onClick={this.props.toggleLogInOpen}>OK</button>
      </div>)
  }
}

checkNewCreds() {
  if(this.state.newEmail.indexOf("@")!==-1&&this.state.newEmail.lastIndexOf(".")>this.state.newEmail.indexOf("@")) {
    if(this.state.newPassword.length>7){
      if(this.state.newPassword===this.state.newPasswordMatch){
        this.setState({validNewCreds:true})

      }
    }
  }
}



async newUserSubmit(e) {
  if(auth.currentUser) {
    this.props.logout()
  }
  e.preventDefault();
  await this.checkNewCreds();
  if(this.state.validNewCreds===true){
    const email = this.state.newEmail;
    const password = this.state.newPassword;
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorMessage = error.message;
      var errorCode = error.code;
      switch (errorCode) {
        case "auth/email-already-in-use":
        alert("youkindadidthisright");
        break;
        default:
        alert(errorMessage);
      }
    }).then((result) => {
      const user = result.user;
      dbAddUser(user)
      // this.props.toggleLogInOpen();
      this.props.setUserAndFavorites(user);
  })
  }else{
    alert("oops")
  }
}



loginWithEmail(e) {
  e.preventDefault();
  if(auth.currentUser) {
    this.props.logout()
  }
  const email = this.state.email;
  const password = this.state.password;
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode, errorMessage);
  }).then((result) => {
    if(!result){
      return
    } else {
      const user = result.user;
      this.props.toggleLogInOpen();
      this.props.setUserAndFavorites(user);
    }
  })
}


googleLogin() {
  if(auth.currentUser) {
    this.props.logout()
  }
  auth.signInWithPopup(provider)
  .then((result) => {
    console.log(result)
    const user = result.user;
    const userPresent = dbCheckUser(user)
    console.log(dbCheckUser(user))
    if(userPresent===false){
      user.favorites = [];
      dbAddUser(user)
    }
    this.props.toggleLogInOpen();
    this.props.setUserAndFavorites(user);
  })
}

  render() {
    const emailSpanContent = this.emailSpan(this.state.email)
    const newEmailSpanContent = this.emailSpan(this.state.newEmail)
    const newPasswordSpanContent = this.passwordSpan(this.state.newPassword)
    const newPasswordMatchSpanContent = this.passwordMatchSpan(this.state.newPasswordMatch)
    const thanksContent = this.validatedThanks()
    return(
      <div
      id="login">
      <button
      className="close-button"
      onClick={this.props.toggleLogInOpen}>X</button>
      {this.state.returningUser?
        <div>
          <h1>LogIn</h1>
          <form onSubmit={this.loginWithEmail}>
            <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email}
            />
          {emailSpanContent}
            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
            />
            <input value="Login" type="submit"/>
          </form>
          <button
            onClick={this.toggleNewUserForm}>
            New User? Sign Up
          </button>
        </div>:
        <div>
          <h1>SignUp</h1>
          <form onSubmit={this.newUserSubmit}>
            <input
            type="text"
            name="newEmail"
            placeholder="E-mail"
            onChange={this.handleChange}
            value={this.state.newEmail}
            />
          {newEmailSpanContent}
            <input
            type="password"
            name="newPassword"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.newPassword}
            />
          {newPasswordSpanContent}
            <input
            type="password"
            name="newPasswordMatch"
            placeholder="Confirm Password"
            onChange={this.handleChange}
            value={this.state.newPasswordMatch}
            />
          {newPasswordMatchSpanContent}
            <input
            id="new-user-submit-button"
            type="submit"
            value="Submit"/>
            <button
            onClick={this.toggleNewUserForm}>
            Already have an account?</button>
          </form>
        </div>}
        {thanksContent}
        <button
          className="google-login"
          onClick={this.googleLogin}>
          <img src={GoogleButtonImage}
            alt="Sign-In with Google`"/></button>
      </div>
    )
  }
}

export default LogInSignUp
