import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import './UserProfile.css';
import { Alert, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import defaultProfilePic from './images/defaultProfilePic.jpg';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currUser.username,
      password: '',
      firstName: this.props.currUser.first_name,
      lastName: this.props.currUser.last_name,
      email: this.props.currUser.email,
      photoUrl: this.props.currUser.photo_url || '',
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleUpdate(evt) {
    evt.preventDefault();
    try {
      let updatedUser = await JoblyApi.patchUser(this.state.username, {
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        photo_url:
          this.state.photoUrl ||
          'https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'
      });
      this.props.updateUser(updatedUser);
      this.setState({ password: '' });
    } catch (err) {
      console.log(err);
      this.setState({
        error: err
      });
    }
  }

  render() {
    let error = this.state.error ? (
      <Alert color="warning">
        {this.state.error ? `${this.state.error}` : null}
      </Alert>
    ) : null;

    return (
      <div className="background">
        <div id="profileContainer">
          <div className="formContainer">
            <Form onSubmit={this.handleUpdate}>
              <div className="picRow">
                <div id="profilePicContainer">
                  <img
                    id="profilePic"
                    src={this.props.currUser.photo_url || defaultProfilePic}
                    alt="profile_picture"
                  />
                </div>
              </div>
              <FormGroup className="formGroup" row>
                <Label className="label" htmlFor="username">
                  Username
                </Label>
                <Col sm={6}>
                  <Input
                    className="input"
                    type="text"
                    disabled={true}
                    name="userName"
                    id="userName"
                    value={this.props.currUser.username}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="formGroup" row>
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
              <FormGroup className="formGroup" row>
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
              <FormGroup className="formGroup" row>
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
              <FormGroup className="formGroup" row>
                <Label className="label" htmlFor="photoUrl">
                  Photo Url
                </Label>
                <Col sm={6}>
                  <Input
                    className="input"
                    type="url"
                    name="photoUrl"
                    id="photoUrl"
                    value={this.state.photoUrl}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="formGroup" row>
                <Label className="label" htmlFor="password">
                  Re-enter Password
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
              <div id="submitRow">
                <Button className="submitButton" color="primary">
                  Save Changes
                </Button>
              </div>
              {error}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
