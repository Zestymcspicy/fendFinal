import React, { Component } from 'react';
import firebase from './firebase.js';
import './LogInSignUp.css'


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
      validNewCreds : "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleNewUserForm = this.toggleNewUserForm.bind(this);
    this.checkNewCreds = this.checkNewCreds.bind(this);
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
  if(text.length<=8){
    return <span className="not-verified">Password must be at least 8 characters</span>
  }
}

checkNewCreds(e) {
  e.preventDefault()
  if(this.state.newEmail.indexOf("@")!==-1&&this.state.newEmail.lastIndexOf(".")>this.state.newEmail.indexOf("@")) {
    if(this.state.newPassword.length>=8){
      if(this.state.newPassword===this.state.newPasswordMatch){
        this.setState({validNewCreds:true})

      }
    }
  }
}

validatedThanks() {
  if(this.state.validNewCreds){
  return <div className="valid-div"><span>hi larry!</span></div>
  }
}

passwordMatchSpan(text) {
  if(text !==this.state.newPassword) {
    return <span className="not-verified">Passwords do not match!</span>
  }
}

toggleNewUserForm(e) {
  // e.preventDefault();
    this.state.returningUser?
    this.setState({returningUser : false}):
    this.setState({returningUser : true})
}

newUserSubmit(email, password)
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

  e.preventDefault();
  console.log(email, password)
}


  render() {

    return(
      <div
      id="login">
      <button
      className="close-button"
      onClick={this.props.toggleLogInOpen}>X</button>
      {this.state.returningUser?
        <div>
          <h1>LogIn</h1>
          <form>
            <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email}
            />
            {this.emailSpan(this.state.email)}
            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
            />
            <button
            onClick={this.toggleNewUserForm}>
            New User?
            </button>
            <button type="submit">Login</button>
          </form>
        </div>:
        <div>
          <h1>SignUp</h1>
          <form onSubmit={this.newUserSubmit(newEmail.value, newPassword.value)}>
            <input
            type="text"
            name="newEmail"
            placeholder="E-mail"
            onChange={this.handleChange}
            value={this.state.newEmail}
            />
            {this.emailSpan(this.state.newEmail)}

            <input
            type="password"
            name="newPassword"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.newPassword}
            />
            {this.passwordSpan(this.state.newPassword)}
            <input
            type="password"
            name="newPasswordMatch"
            placeholder="Confirm Password"
            onChange={this.handleChange}
            value={this.state.newPasswordMatch}
            />
            {this.passwordMatchSpan(this.state.newPasswordMatch)}
            <input
            id="new-user-submit-button"
            onClick={this.checkNewCreds}
            type="submit"
            value="Submit"/>
            <button
            onClick={this.toggleNewUserForm}>
            Already have an account?</button>
          </form>
        </div>}
        {this.validatedThanks}
      </div>
    )
  }
}

export default LogInSignUp
