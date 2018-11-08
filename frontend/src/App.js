import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
import NavBar from './NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null
    };
    this.makeCurrUser = this.makeCurrUser.bind(this);
  }
  //getting token successfully, next step decode token, store token in local storage and
  //make request with username
  makeCurrUser(token) {
    console.log(token);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Routes makeCurrUser={() => this.makeCurrUser} />
      </div>
    );
  }
}

export default App;
