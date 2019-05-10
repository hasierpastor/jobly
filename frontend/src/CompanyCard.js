import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import './CompanyCard.css';

class CompanyCard extends Component {
  render() {
    //when link is clicked, go to company page
    return (
      <div id="companyCard">
        <Link
          style={{ textDecoration: 'none' }}
          to={`/companies/${this.props.handle}`}
        >
          <Card
            style={{
              margin: '1rem',
              backgroundColor: '#141e30',
              color: 'white',
              fontFamily: 'Lato',
              opacity: 0.8,
              border: 'solid 1px',
              borderColor: '#141e30'
            }}
          >
            <CardBody id="cardBody">
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
