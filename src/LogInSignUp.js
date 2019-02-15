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

    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleNewUserForm = this.toggleNewUserForm.bind(this);
  }

handleChange(e) {
  this.setState({[e.target.name]: e.target.value})
}

toggleNewUserForm(e) {
  // e.preventDefault();
    this.state.returningUser?
    this.setState({returningUser : false}):
    this.setState({returningUser : true})
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
            <input
            type="text"
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
          <form submit={this.newUserSubmit}>
            <input
            type="text"
            name="email"
            placeholder="E-mail"
            onChange={this.handleChange}
            value={this.state.newEmail}
            />
            <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.newPassword}
            />
            <input
            type="text"
            name="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
            value={this.state.newPasswordMatch}
            />
            <button type="submit">Submit</button>
            <button
            onClick={this.toggleNewUserForm}>
            Already have an account
            ?</button>
          </form>
        </div>}
      </div>
    )
  }
}

export default LogInSignUp
