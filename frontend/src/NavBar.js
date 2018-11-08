import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  render() {
    console.log(this.props);
    if (!this.props.currUser) {
      return (
        <nav>
          <NavLink to="/">Jobly</NavLink>
          <NavLink to="/login">Log in</NavLink>
        </nav>
      );
    }
    return (
      <nav>
        <NavLink exact to="/">
          Jobly
        </NavLink>
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/logout">Log out</NavLink>
      </nav>
    );
  }
}

export default NavBar;
