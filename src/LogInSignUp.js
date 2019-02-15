import React, { Component } from 'react';
import firebase from './firebase.js';
import './LogInSignUp.css'


class LogInSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAccount : true,
      username : "",
      password : "",

    }
  }

handleChange(e) {
  this.setState({[e.target.name]: e.target.value})
}


  render() {

    return(
      <div
      id="login">
      <button
      className="close-button"
      onClick={this.props.toggleLogInOpen}>X</button>
      {this.state.hasAccount?
        <div>
          <h1>LogIn</h1>
          <form>
            <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
            />
            <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
            />
            <button type="submit">Submit</button>
          </form>
        </div>:
        <div>
          <h1>SignUp</h1>
          <form submit={this.newUserSubmit}>
            <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.newUserName}
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
          </form>
        </div>}
      </div>
    )
  }
}

export default LogInSignUp
