import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
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
        <PrivateRoute
          exact
          path="/companies"
          currUser={this.props.currUser}
          render={() => <CompanyList currUser={this.props.currUser} />}
        />
        <PrivateRoute
          exact
          path="/jobs"
          currUser={this.props.currUser}
          render={() => (
            <JobList
              currUser={this.props.currUser}
              updateUser={this.props.updateUser}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/profile"
          currUser={this.props.currUser}
          render={() => (
            <UserProfile
              makeCurrUser={this.props.makeCurrUser}
              currUser={this.props.currUser}
              updateUser={this.props.updateUser}
            />
          )}
        />
        <PrivateRoute
          path="/companies/:company"
          currUser={this.props.currUser}
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
        )} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Routes;
