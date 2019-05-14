# Jobly

Jobly is a mock app where users can view job postings and apply for open positions. The frontend was built with React and the backend was built with Node, Express, and PostgreSQL.

To see a live demo: https://reactjs-jobly.herokuapp.com/companies

- Username: test
- Password: password

## Installation

_To run this repository locally:_

1. git clone
2. createdb jobly
3. psql jobly < data.sql

_Set up the backend:_

1. cd "backend"
2. `npm install`
3. `nodemon`

_Set up the frontend:_

1. cd "frontend"
2. `npm install`
3. `npm start`

## Features

- Users can browse companies, view jobs and apply to open positions
- Users can signup, login and edit their profile
  - Used JWT tokens for user authentication and authorization
- Live search implemented using lodash debounce function
- Postgres database to store jobs/companies/users
- Server side validation using JSON Schema
- Security/passowrd hashing using bcrypt

## Technologies

- React
- Node/Express
- JWT
- PostgreSQL
- Bcrypt
- JSON Schema
- Reactstrap/Bootstrap
- Axios
- Jest

## Sample

**Here's a sample page (company profile page where users can apply to jobs):**

![alt text](https://github.com/hasierpastor/react_jobly/blob/master/images/main.jpg 'Company Page')

**Here's a sample of the JSON returned from the backend (a GET to '/jobs'):**

![alt text](https://github.com/SKaplan01/react_jobly/blob/master/images/backend.png "Sample JSON returned from GET to '/jobs'")

## Features To Add

- State management using Redux or other technology
- Batch pagination for job and company lists
- Allow users to unapply to jobs

## Collaborators

https://github.com/SKaplan01/jobly
