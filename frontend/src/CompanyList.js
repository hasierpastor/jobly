import React, { Component } from 'react';
import Routes from './Routes';
import JoblyApi from './ApiHelper';
import CompanyCard from './CompanyCard';

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      search: '',
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let companies = await JoblyApi.getCompanies();
    this.setState({ companies: companies, isLoading: false });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let companies = await JoblyApi.getCompanies({ search: this.state.search });
    this.setState({ companies: companies, isLoading: false });
  }

  handleChange(evt) {
    this.setState({ search: evt.target.value });
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOADING....</div>;
    }

    let cards = this.state.companies.map(company => {
      return (
        <CompanyCard name={company.name} description={company.description} />
      );
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        {cards}
      </div>
    );
  }
}

export default CompanyList;
