import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Switch, Route } from 'react-router-dom';

class NewItem extends Component {
  constructor(props) {
    super(props);
    this.newItemSubmit = this.newItemSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { item_name: '', container: '', location: '' };
  }
  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  async newItemSubmit(event) {
    event.preventDefault();
    try {
      const response = await (
        await fetch('http://localhost:3000/api/addItem', {
          method: 'POST',
          body: JSON.stringify({
            userId: this.props.userId,
            item_name: this.state.item,
            container: this.state.container,
            location: this.state.location,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
      console.log('response body', response);
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
        <form onSubmit={this.newItemSubmit}>
          <div>
            Item:
            <input
              name="item"
              value={this.state.name}
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            Container:
            <input
              name="container"
              value={this.state.email}
              type="text"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            Location:
            <input
              name="location"
              value={this.state.password}
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

export default withRouter(NewItem);
