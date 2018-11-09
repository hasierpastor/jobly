import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: false,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.isLogin = this.isLogin.bind(this);
    this.isSignup = this.isSignup.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  //makes login request using api helper function
  //if login successful, calls makeCurrUser,
  //which passes a token to App to get user data and set top level state
  //successful --> redirects to /jobs
  //unsuccessful --> sets state to display error
  async handleLogin(evt) {
    try {
      evt.preventDefault();
      let token = await JoblyApi.login({
        username: this.state.username,
        password: this.state.password
      });
      this.props.makeCurrUser(token);
      this.setState({
        username: '',
        password: '',
        error: false
      });
      this.props.history.push('/jobs');
    } catch (err) {
      console.log(err);
      this.setState({
        username: '',
        password: '',
        error: err
      });
    }
  }

  //makes request to register using api helper function
  //if register successful, calls makeCurrUser,
  //which passes a token to App to get user data and set top level state
  //successful --> redirects to /jobs
  //unsuccessful --> sets state to display error
  async handleRegister(evt) {
    try {
      evt.preventDefault();
      let token = await JoblyApi.registerUser({
        username: this.state.username,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email
      });
      this.props.makeCurrUser(token);
      this.setState({
        error: false
      });
      this.props.history.push('/jobs');
    } catch (err) {
      console.log(err);
      this.setState({
        error: err
      });
    }
    this.setState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    });
  }

  isLogin() {
    this.setState({ isSignup: false });
  }

  isSignup() {
    this.setState({ isSignup: true });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    const baseFormHtml = (
      <div>
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
          type="password"
          name="password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
      </div>
    );

    //if there is a currUser logged in, trying to go to /login redirects to homepage
    if (this.props.currUser) {
      return <Redirect to="/" />;
    }
    if (!this.state.isSignup) {
      return (
        <div>
          <button onClick={this.isLogin}>Login</button>
          <button onClick={this.isSignup}>SignUp</button>
          <form onSubmit={this.handleLogin}>
            {baseFormHtml}
            <button>Submit</button>
          </form>
          <div>{this.state.error ? `${this.state.error}` : null}</div>
        </div>
      );
    }

    return (
      <div>
        <button onClick={this.isLogin}>Login</button>
        <button onClick={this.isSignup}>SignUp</button>
        <form onSubmit={this.handleRegister}>
          {baseFormHtml}
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
        <div>{this.state.error ? `${this.state.error}` : null}</div>
      </div>
    );
  }
}

export default Login;
