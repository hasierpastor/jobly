import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import JoblyApi from './JoblyApi';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick;
  }

  async handleClick(id) {
    await JoblyApi.applyJob(id);
    let user = await JoblyApi.getUser(this.props.currUser.username);
    await this.props.updateUser(user);
  }

  render() {
    let button = this.props.hasApplied ? (
      <Button
        style={{ opacity: 2, color: 'white', backgroundColor: '#42b7ce' }}
        outline
      >
        {' '}
        Applied
      </Button>
    ) : (
      <Button
        style={{ color: 'white' }}
        outline
        onClick={() => this.handleClick(this.props.id)}
      >
        Apply
      </Button>
    );
    //if hasApplied props is true display applied otherwise display apply
    return (
      <div>
        <Card
          style={{
            margin: '1rem',
            backgroundColor: '#141e30',
            color: 'white',
            fontFamily: 'Lato',
            opacity: 0.8,
            height: '14rem'
          }}
        >
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <CardText>Salary: {this.props.salary}</CardText>
            <CardText>Equity: {this.props.equity}</CardText>
            {button}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default JobCard;
