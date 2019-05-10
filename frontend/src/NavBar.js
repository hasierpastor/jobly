import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    if (!this.props.currUser) {
      return (
        <nav>
          <NavLink class="navlink" to="/">
            Home
          </NavLink>
          <NavLink class="navlink" to="/login">
            Log In
          </NavLink>
        </nav>
      );
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavLink class="navlink" id="brandLink" exact to="/">
            Home
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" onClick={this.toggle} navbar>
              <NavItem>
                <NavLink to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <Button id="logoutButton" onClick={this.props.doLogout}>
                  Log out
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
