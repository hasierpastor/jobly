import React, { Component } from 'react';
import Login from './Login';
import './Home.css';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  render() {
    let content;
    if (!this.props.currUser) {
      content = (
        <Login
          makeCurrUser={this.props.makeCurrUser}
          currUser={this.props.currUser}
        />
      );
    } else {
      content = (
        <div>
          <NavLink to="/jobs">
            <Button
              style={{
                backgroundColor: '#141e30',
                color: 'white',
                width: '8rem',
                height: '3rem',
                opacity: '0.8'
              }}
              className="link-button"
            >
              View Jobs
            </Button>
          </NavLink>
        </div>
      );
    }
    return (
      <div id="HomeContainer">
        <div className="back-drop">
          <h1>jobly</h1>
          {content}
        </div>
      </div>
    );
  }
}

export default Home;
