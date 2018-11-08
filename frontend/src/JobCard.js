import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

class JobCard extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <CardText>Salary: {this.props.salary}</CardText>
            <CardText>Equity: {this.props.equity}</CardText>
            <button>Apply</button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default JobCard;
