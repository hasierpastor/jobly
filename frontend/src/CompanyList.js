import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import CompanyCard from './CompanyCard';
import _ from 'lodash';

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
    // this.filterSearch = this.filterSearch.bind(this);
  }

  //after CompanyList mounts, gets companies from backend and adds to state
  async componentDidMount() {
    try {
      let companies = await JoblyApi.getCompanies();
      this.setState({ companies: companies, isLoading: false });
    } catch (err) {
      console.log(err);
      this.setState({ companies: null, isLoading: false });
    }
  }

  //when search form is submitted, makes request to backend with searchterm
  //{search: searchtermFromForm} --> defaults to {} if no search term
  async handleSubmit(evt) {
    console.log('handlesubmit ran!');
    try {
      let companies = await JoblyApi.getCompanies({
        search: this.state.search
      });
      this.setState({ companies, isLoading: false });
    } catch (err) {
      console.log(err);
      this.setState({ companies: null, isLoading: false });
    }
  }

  //handleChange now also calls lodash.debounce which dynamically filters companies
  async handleChange(evt) {
    console.log('handlechange ran!');
    this.setState({ search: evt.target.value });
    _.debounce(await this.handleSubmit, 500)();
  }

  render() {
    console.log('RENDERING');
    if (this.state.isLoading) {
      return <div>LOADING....</div>;
    }

    if (!this.state.companies) {
      return <div>Companies not found</div>;
    }

    let cards = this.state.companies.map(company => {
      return (
        <div className="cardHolder">
          <CompanyCard
            name={company.name}
            description={company.description}
            handle={company.handle}
            key={company.handle}
          />
        </div>
      );
    });

    return (
      <div className="list">
        <form className="searchForm">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>
        {cards}
      </div>
    );
  }
}

export default CompanyList;
