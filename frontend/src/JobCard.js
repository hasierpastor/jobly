import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import JoblyApi from './JoblyApi';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Not Applied'
    };
    this.handleClick = this.handleClick;
  }

  async handleClick(id) {
    await JoblyApi.applyJob(id);
    let user = await JoblyApi.getUser(this.props.currUser.username);
    await this.props.updateUser(user);
  }

  render() {
    console.log(this.props.currUser);
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <CardText>Salary: {this.props.salary}</CardText>
            <CardText>Equity: {this.props.equity}</CardText>
            <button onClick={() => this.handleClick(this.props.id)}>
              {this.props.hasApplied ? 'Applied' : 'Apply'}
            </button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default JobCard;
