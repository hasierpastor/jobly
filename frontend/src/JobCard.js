import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import JoblyApi from './JoblyApi';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick;
  }

  async handleClick(id) {
    await JoblyApi.applyJob(id);
    console.log(this.props.currUser);
    let user = await JoblyApi.getUser(this.props.currUser.username);
    console.log(this.props);
    await this.props.updateUser(user);
  }

  render() {
    //if hasApplied props is true display applied otherwise display apply
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
