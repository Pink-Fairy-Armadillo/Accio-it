import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Switch, Route } from 'react-router-dom';

// import Login from './Login'
class Signup extends Component {
  constructor(props) {
    super(props);
    this.signUpSubmit = this.signUpSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { email: '', password: '', name: '' };
  }
  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  async signUpSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/addUser', {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          preferred_name: this.state.name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response);
      if (response.status === 200) {
        this.props.history.replace('/welcome');
        // <Switch>
        //   <Route
        //     to="/welcome"
        //     render={(props) => <Welcome {...props} name={this.state.name} />}
        //   />
        // </Switch>;
      } else {
        alert('Username already exists!');
      }
      // logic for what we want it to do after signup (if response is 200 or not)
    } catch (error) {
      console.log('Error in signUpSubmit: ', error);
    }
  }

  render() {
    return (
      <div>
        <Link to="/welcome">
          <button className="home" type="button">
            Accio Home!
          </button>
        </Link>
        <form onSubmit={this.signUpSubmit}>
          <div>
            Name:
            <input
              name="name"
              value={this.state.name}
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            Email:
            <input
              name="email"
              value={this.state.email}
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            Password:
            <input
              name="password"
              value={this.state.password}
              type="password"
              onChange={this.handleChange}
            ></input>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
