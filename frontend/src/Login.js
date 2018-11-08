import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: false,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    // this.handleRegister = this.handleRegister.bind(this);
  }

  async handleLogin(evt) {
    try {
      evt.preventDefault();
      let token = await JoblyApi.login({
        username: this.state.username,
        password: this.state.password
      });
      this.makeCurrUser(token);
    } catch (err) {
      console.log(err);
      this.setState({
        username: '',
        password: ''
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  //is there any way to store baseForm as a variable?
  render() {
    if (!this.state.isSignup) {
      return (
        <form onSubmit={this.handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      );
    }

    return (
      <form onSubmit={this.handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button>Submit</button>
        <label htmlFor="firstName">First Name</label>

        <input
          type="text"
          name="firstName"
          id="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default Login;
