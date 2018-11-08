import React, { Component } from 'react';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';

class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, company: {} };
  }
  //after CompanyPage mounts, gets company info from backend and add to state
  async componentDidMount() {
    try {
      let company = await JoblyApi.getCompany(this.props.match.params.company);
      this.setState({ company, isLoading: false });
    } catch (err) {
      console.log(err);
      this.setState({ company: null, isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOADING....</div>;
    }

    if (!this.state.company) {
      return <div>Company not Found</div>;
    }

    let jobs = this.state.company.jobs.map(job => (
      <JobCard
        title={job.title}
        salary={job.salary}
        equity={job.equity}
        key={job.id}
      />
    ));

    return (
      <div className="CompanyPage">
        <h1>{this.state.company.name}</h1>
        <p>{this.state.company.description}</p>
        {jobs}
      </div>
    );
  }
}

export default CompanyPage;
