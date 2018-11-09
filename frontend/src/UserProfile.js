import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currUser.username,
      password: '',
      firstName: this.props.currUser.first_name,
      lastName: this.props.currUser.last_name,
      email: this.props.currUser.email,
      photoUrl: this.props.currUser.photo_url,
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
        photo_url: this.state.photoUrl || 'https://lorempixel.com/200/200'
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
    return (
      <div>
        <form onSubmit={this.handleUpdate}>
          <p htmlFor="username">Username: {this.props.currUser.username}</p>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="photoUrl">Photo Url</label>
          <input
            type="url"
            name="photoUrl"
            id="photUrl"
            value={this.state.photoUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Re-enter Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Save Changes</button>
        </form>
        <div>{this.state.error ? `${this.state.error}` : null}</div>
      </div>
    );
  }
}

export default UserProfile;
