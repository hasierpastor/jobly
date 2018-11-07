import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

class JobCard extends Component {
  render() {
    //change link to go to company page
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
