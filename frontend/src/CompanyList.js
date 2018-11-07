import React, { Component } from 'react';
import Routes from './Routes';
import JoblyApi from './ApiHelper';
import CompanyCard from './CompanyCard';

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    let companies = await JoblyApi.getCompanies();
    this.setState({ companies: companies, isLoading: false });
  }
  render() {
    if (this.state.isLoading) {
      return <div>LOADING....</div>;
    }

    return this.state.companies.map(company => {
      return (
        <CompanyCard name={company.name} description={company.description} />
      );
    });
  }
}

export default CompanyList;
