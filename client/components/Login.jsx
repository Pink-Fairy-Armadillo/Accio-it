import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignIn = this.onSignIn.bind(this);

    this.state = { email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  onSignIn() {
    // This is null if the 'email' scope is not present.

    console.log('logged in');
    //let profile = googleUser.getBasicProfile();
    //let id_token = googleUser.getAuthResponse().id_token;
    //console.log('ID token:', id_token);
    //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  //handleSubmit function --> make a post request to the database - in the backend do the logic to check if the user is correct
  //if we get a 200 response, we know the user can login
  //if not then the username or password is wrong

  //   componentDidMount() {
  //     window.GamepadHapticActuator.signin2.render('google-sign-in-button', {
  //       width: 200,
  //       height: 50,
  //       onsuccess: this.onSuccess,
  //     });
  //   }

  //   onSuccess(googleUser) {
  //     const profile = googleUser.getBasicProfile();
  //     console.log('Name:' + profiled.getName());
  //   }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await (
        await fetch('http://localhost:3000/api/verifyUser', {
          method: 'POST',
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            preferred_name: this.state.name,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
      console.log('response from login fetch:', response);
      if (!response.err) {
        this.props.handleLogin(response);
        this.props.history.replace('/welcome');
      } else {
        alert(
          'Wrong username or password, please try again or register as a new user',
        );
      }
      //logic for what we want it to do after login (if response is 200 or not)
    } catch (error) {
      console.log('Error in handleSubmit of Login:', error);
    }
  }

  render() {
    return (
      <div className="each-page">
        <h1 className="logo">Accio It</h1>
        <div className="demo-btn-row">
          <Link to="/forgotinfo">
            <button className="forgotinfo" type="button">
              Forgot Info
            </button>
          </Link>
          <Link to="/signup">
            <button type="button">Register</button>
          </Link>
          {/* <Link to="/welcome">
            <button type="button">Go to welcome demo</button>
          </Link> */}
          {/* <Link to="/search">
            <button type="button">Go to search demo</button>
          </Link>
          <Link to="/myitems">
            <button type="button">Go to items demo</button>
          </Link>
          <Link to="/mylocations">
            <button type="button">Go to locations demo</button>
          </Link> */}
        </div>
        <form onSubmit={this.handleSubmit}>
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
          <input className="bigger-btn" type="submit" value="Login"></input>
        </form>
        {/* <div className="g-signin2" onClick={this.onSignIn}></div> */}
      </div>
    );
  }
}

export default withRouter(Login);
