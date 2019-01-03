import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import './JobList.css';
import _ from 'lodash';

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      search: '',
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //after JobList mounts, gets jobs from backend and adds to state
  async componentDidMount() {
    try {
      let jobs = await JoblyApi.getJobs();
      this.setState({ jobs: jobs, isLoading: false });
    } catch (err) {
      console.log(err);
      this.setState({ jobs: null, isLoading: false });
    }
  }

  //when search form is submitted, makes request to backend with searchterm
  //{search: searchtermFromForm} --> defaults to {} if no search term
  async handleSubmit(evt) {
    try {
      let jobs = await JoblyApi.getJobs({ search: this.state.search });
      this.setState({ jobs, isLoading: false });
    } catch (err) {
      console.log(err);
      this.setState({ jobs: null, isLoading: false });
    }
  }

  async handleChange(evt) {
    this.setState({ search: evt.target.value }, () =>
      _.debounce(this.handleSubmit, 500)()
    );
  }

  render() {
    //map through jobs that user has applied to and create a new set with the id of those jobs
    const jobIdsAppliedTo = new Set(
      this.props.currUser.jobs.map(job => job.id)
    );
    if (this.state.isLoading) {
      return <div>LOADING....</div>;
    }

    if (!this.state.jobs) {
      return <div>Jobs not found</div>;
    }

    let cards = this.state.jobs.map(job => {
      return (
        <div className="cardHolder" key={job.id + 'div'}>
          <JobCard
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            key={job.id}
            id={job.id}
            currUser={this.props.currUser}
            updateUser={this.props.updateUser}
            state={job.state}
            //pass down a true or false property depending if job.id is in set of job ids user has applied to
            hasApplied={jobIdsAppliedTo.has(job.id)}
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

export default JobList;
