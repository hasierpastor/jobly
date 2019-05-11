import React, { Component } from 'react';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';
import './CompanyPage.css';
import Loader from 'react-loader-spinner';

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
    //map through jobs that user has applied to and create a new set with the id of those jobs
    const jobIdsAppliedTo = new Set(
      this.props.currUser.jobs.map(job => job.id)
    );

    if (this.state.isLoading) {
      return <Loader type="ThreeDots" color="#42b7ce" height="80" width="80" />;
    }

    if (!this.state.company) {
      return <div>Company not Found</div>;
    }

    let jobs = this.state.company.jobs.map(job => (
      //CHANGE props passed to job card so shows applied/ not applied
      <div className="cardHolder" key={job.id + 'div'}>
        <JobCard
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          key={job.id}
          hasApplied={jobIdsAppliedTo.has(job.id)}
          id={job.id}
          state={job.state}
          currUser={this.props.currUser}
          updateUser={this.props.updateUser}
        />
      </div>
    ));

    return (
      <div className="companyPage">
        <div className="companyHeader">
          <h1 id="header">{this.state.company.name}</h1>
          <p>{this.state.company.description}</p>
        </div>
        {jobs}
      </div>
    );
  }
}

export default CompanyPage;
