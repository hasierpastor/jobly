import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

class JoblyApi {
  //makes request to backend, takes in endpoint url, params (query or body of request), and request verb
  static async request(endpoint, params = {}, verb = 'get') {
    let _token = localStorage.getItem('userToken');

    console.debug('API Call:', endpoint, params, verb);

    let q;

    //builds base url for request depending on verb
    if (verb === 'get') {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params }
      });
    } else if (verb === 'post') {
      q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === 'patch') {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //gets one company by handle, returns company data
  static async getCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    } catch (err) {
      throw err;
    }
  }

  //returns a list of companyObjects, filtered by search term
  static async getCompanies(queryObj) {
    try {
      let res = await this.request(`companies/`, queryObj);
      return res.companies;
    } catch (err) {
      throw err;
    }
  }

  //returns a list of job Objects, filtered by search term
  static async getJobs(queryObj) {
    try {
      let res = await this.request(`jobs/`, queryObj);
      return res.jobs;
    } catch (err) {
      throw err;
    }
  }

  //logs in a user and returns token from backend
  static async login(bodyObj) {
    try {
      let res = await this.request(`login/`, bodyObj, 'post');
      return res.token;
    } catch (err) {
      throw err;
    }
  }

  //gets data about the current user (to set current User data in state)
  static async getUser(username) {
    try {
      let res = await this.request(`users/${username}`);
      return res.user;
    } catch (err) {
      throw err;
    }
  }

  //makes post request to add user to backend and returns token if post is successful
  static async registerUser(newUserObj) {
    try {
      let res = await this.request('users/', newUserObj, 'post');
      return res.token;
    } catch (err) {
      throw err;
    }
  }
}

export default JoblyApi;
