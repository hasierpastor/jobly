import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import NavBar from './NavBar';
import { decode } from 'jsonwebtoken';
import JoblyApi from './JoblyApi';
import { Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
      isLoading: true
    };
    this.makeCurrUser = this.makeCurrUser.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  //on refresh, check localstorage for token (is someone logged in)
  //if no token, curr user is null and page redirects to login
  //if there IS a token, setState with currUser and redirect to last page visited
  async componentDidMount() {
    try {
      let token = localStorage.getItem('userToken');
      if (token) {
        let username = decode(token).username;
        let user = await JoblyApi.getUser(username);
        this.setState({ currUser: user, isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  //called with token from login, stores token in local storage, decodes token, and
  //makes request with username from token --> adds user to state
  async makeCurrUser(token) {
    try {
      localStorage.setItem('userToken', token);
      let username = decode(token).username;
      let user = await JoblyApi.getUser(username);
      this.setState({ currUser: user });
    } catch (err) {
      throw err;
    }
  }

  //deletes token from local storage, sets currUSer to null, passes updated state (currUser: null) to logout
  async doLogout() {
    localStorage.setItem('userToken', '');
    this.setState({ currUser: null });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    //if no user is logged in, redirect to '/login'
    if (!this.state.currUser) {
      return (
        <div className="App">
          <NavBar currUser={this.state.currUser} />
          <Routes
            makeCurrUser={this.makeCurrUser}
            currUser={this.state.currUser}
          />
          <Redirect to="/login" />
        </div>
      );
    }
    //pass currUser to routes if logged in
    return (
      <div className="App">
        <NavBar currUser={this.state.currUser} />
        <Routes
          makeCurrUser={this.makeCurrUser}
          currUser={this.state.currUser}
          doLogout={this.doLogout}
        />
      </div>
    );
  }
}

export default App;
