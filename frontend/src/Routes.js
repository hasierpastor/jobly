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
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/companies" render={() => <CompanyList />} />
        <Route exact path="/jobs" render={() => <JobList />} />
        <Route exact path="/profile" render={() => <UserProfile />} />
        <Route
          path="/companies/:company"
          render={props => <CompanyPage {...props} />}
        />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/logout" render={() => <Logout />} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Routes;
