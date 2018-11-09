// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// class Logout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { isLoading: true };
//   }

//   //call logout function in app, which sets currUser to null and passes to all routes
//   componentDidMount() {
//     this.props.doLogout();
//     this.setState({ isLoading: false });
//   }

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <div className="Logout">
//           <h1>Loading...</h1>
//         </div>
//       );
//     }
//     //tried to do history.push, but logout didn't render anything (page blank)
//     return <Redirect to="/login" />;
//   }
// }

// export default Logout;
