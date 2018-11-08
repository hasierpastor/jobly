import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';

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
      evt.preventDefault();
      let jobs = await JoblyApi.getJobs({ search: this.state.search });
      this.setState({ jobs, isLoading: false, search: '' });
    } catch (err) {
      console.log(err);
      this.setState({ jobs: null, isLoading: false });
    }
  }

  handleChange(evt) {
    this.setState({ search: evt.target.value });
  }

  render() {
    if (this.state.isLoading) {
      return <div>LOADING....</div>;
    }

    if (!this.state.jobs) {
      return <div>Jobs not found</div>;
    }

    let cards = this.state.jobs.map(job => {
      return (
        <JobCard
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          key={job.id}
        />
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

export default JobList;
