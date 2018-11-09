import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

class CompanyCard extends Component {
  render() {
    //when link is clicked, go to company page
    return (
      <div>
        <Link to={`/companies/${this.props.handle}`}>
          <Card>
            <CardBody>
              <CardTitle>{this.props.name}</CardTitle>
              <CardText>{this.props.description}</CardText>
            </CardBody>
          </Card>
        </Link>
      </div>
    );
  }
}

export default CompanyCard;
