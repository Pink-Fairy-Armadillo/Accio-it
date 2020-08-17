import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.resetPasswordSubmit = this.resetPasswordSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { email: '', password: '', redirect: false };
  }
  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }
  async resetPasswordSubmit(event) {
    event.preventDefault();
    try {
      const data = {
        email: this.state.email,
        newPassword: this.state.password,
      };
      console.log(data);
      await fetch('http://localhost:3000/api/resetPassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success: ', data);
          alert('password has been reset');
          this.setState({
            email: '',
            password: '',
            redirect: true,
          });
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
        <form onSubmit={this.resetPasswordSubmit}>
          <div>
            Email:
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            New Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
            {/* <Link to="/login"> */}
            <input
              type="submit"
              value="Reset Password"
              onClick={this.resetPasswordSubmit}
            />
            {/* <button className="login" type="button">Reset</button> */}
            {/* </Link> */}
            {this.state.redirect ? <Redirect push to="/" /> : null}
          </div>
        </form>
      </div>
    );
  }
}
export default ChangePassword;
