import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignIn = this.onSignIn.bind(this);

    this.state = { username: '', password: '' };
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
      //logic for what we want it to do after login (if response is 200 or not)
    } catch (error) {
      console.log('Error in handleSubmit of Login:', error);
    }
  }

  render() {
    return (
      <div>
        <form>
          <div>
            Username:
            <input
              name="username"
              value={this.state.username}
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
          <input type="submit" value="Login"></input>
        </form>
        <div className="g-signin2" onClick={this.onSignIn}></div>
      </div>
    );
  }
}

export default Login;
