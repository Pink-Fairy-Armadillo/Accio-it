import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Switch, Route } from 'react-router-dom';

class NewLocation extends Component {
  constructor(props) {
    super(props);
    this.newLocation = this.newLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      location: '',
      container: '',
    };
  }
  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  async newLocation(event) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/addItem', {
        method: 'POST',
        body: JSON.stringify({
          userId: this.props.userId,
          location: this.state.location,
          container: this.state.container,
        }),

        headers: {
          'Content-Type': 'application/json',
        },
      });

      //console.log('response body', response);
      if (response.status === 200) {
        this.props.history.replace('/welcome');
      } else {
        alert('That did not work, try again!');
      }
      // logic for what we want it to do after signup (if response is 200 or not)
    } catch (error) {
      console.log('Error in newItemSubmit: ', error);
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
        <form onSubmit={this.newLocation}>
          <div>
            Location:
            <input
              name="location"
              value={this.state.location}
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            Container:
            <input
              name="container"
              value={this.state.container}
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(NewLocation);
