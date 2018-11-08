import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import CompanyList from './CompanyList';
import CompanyPage from './CompanyPage';
import JobList from './JobList';
import UserProfile from './UserProfile';
import Login from './Login';
import Logout from './Logout';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home currUser={this.props.currUser} />}
        />
        <Route
          exact
          path="/companies"
          render={() => <CompanyList currUser={this.props.currUser} />}
        />
        <Route
          exact
          path="/jobs"
          render={() => <JobList currUser={this.props.currUser} />}
        />
        <Route
          exact
          path="/profile"
          render={() => <UserProfile currUser={this.props.currUser} />}
        />
        <Route
          path="/companies/:company"
          render={props => (
            <CompanyPage {...props} currUser={this.props.currUser} />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login
              {...props}
              makeCurrUser={this.props.makeCurrUser}
              currUser={this.props.currUser}
            />
          )}
        />
        <Route
          exact
          path="/logout"
          render={props => (
            <Logout
              currUser={this.props.currUser}
              doLogout={this.props.doLogout}
              {...props}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Routes;
