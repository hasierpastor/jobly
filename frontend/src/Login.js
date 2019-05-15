import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import { Redirect } from 'react-router-dom';
import './Login.css';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ButtonGroup
} from 'reactstrap';

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
    let error = this.state.error ? (
      <Alert className="error" color="danger">
        {this.state.error ? `${this.state.error}` : null}
      </Alert>
    ) : null;

    const baseFormHtml = (
      <div className="form-container">
        <FormGroup className="form-group" row>
          <Label className="label" htmlFor="username">
            Username
          </Label>
          <Col sm={6}>
            <Input
              className="input"
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="form-group" row>
          <Label className="label" htmlFor="password">
            Password
          </Label>
          <Col sm={6}>
            <Input
              className="input"
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
      </div>
    );

    //if there is a currUser logged in, trying to go to /login redirects to homepage
    if (this.props.currUser) {
      return <Redirect to="/" />;
    }
    if (!this.state.isSignup) {
      return (
        <div className="container">
          <ButtonGroup>
            <Button
              outline
              style={{
                backgroundColor: '#141e30',
                opacity: '0.9'
              }}
              className="login-button"
              onClick={this.isLogin}
            >
              Login
            </Button>
            <Button
              outline
              style={{
                backgroundColor: '#141e30',
                opacity: '0.9'
              }}
              className="signup-button"
              onClick={this.isSignup}
            >
              SignUp
            </Button>
          </ButtonGroup>
          <Form onSubmit={this.handleLogin}>
            {baseFormHtml}
            <div id="submitRow">
              <Button
                style={{ color: 'white' }}
                outline
                className="submit-button"
              >
                Submit
              </Button>
            </div>
          </Form>
          {error}
        </div>
      );
    }

    return (
      <div className="container">
        <ButtonGroup>
          <Button
            outline
            style={{
              backgroundColor: '#141e30',
              opacity: '0.9'
            }}
            className="login-button"
            onClick={this.isLogin}
          >
            Login
          </Button>
          <Button
            outline
            style={{
              backgroundColor: '#141e30',
              opacity: '0.9'
            }}
            className="signup-button"
            onClick={this.isSignup}
          >
            SignUp
          </Button>
        </ButtonGroup>
        <div className="form-container">
          <Form onSubmit={this.handleRegister}>
            {baseFormHtml}
            <FormGroup className="form-group" row>
              <Label className="label" htmlFor="firstName">
                First Name
              </Label>
              <Col sm={6}>
                <Input
                  className="input"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="form-group" row>
              <Label className="label" htmlFor="lastName">
                Last Name
              </Label>
              <Col sm={6}>
                <Input
                  className="input"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup className="form-group" row>
              <Label className="label" htmlFor="email">
                Email
              </Label>
              <Col sm={6}>
                <Input
                  className="input"
                  type="text"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <div id="submitRow">
              <Button
                outline
                className="submit-button"
                style={{ color: 'white' }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
        {error}
      </div>
    );
  }
}

export default Login;
