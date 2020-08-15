import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import Login from './Login'
class Signup extends Component {
  constructor(props) {
    super(props);
    this.signUpSubmit = this.signUpSubmit.bind(this);
    this.state = { username: '', password: '' };
  }

  async signUpSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('url', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
          <form>
              <div>
                  Username:
                  <input
                  name="username"
                  value={this.state.username}
                  type="text"
                  onChange={this.state.signUpSubmit}
                  ></input>
              </div>
          </form>
          <form>
              <div>
                  Password:
                  <input
                  name="password"
                  value={this.state.username}
                  type="text"
                  onChange={this.state.signUpSubmit}
                  ></input>
              </div>
          </form>
      </div>
    );
  }
}

export default Signup;
