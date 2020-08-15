import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'Accio!',
      search: '',
      locations: ['kitchen', 'storage', 'living room'],
      items: ['sawyer', 'lizzy', 'dodo'],
    };
    this.styles = {
      fontSize: 50,
      fontWeight: 'bold',
    };
    this.itemLookup = this.itemLookup.bind(this);
  }

  async itemLookup(event) {
    event.preventDefault();
    try {
      const response = await fetch('url', {
        method: 'POST',
        body: JSON.stringify({ search: this.state.search }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // logic for what we want it to do after signup (if response is 200 or not)
    } catch (error) {
      console.log('Error in signUpSubmit: ', error);
    }
  }

  //wherever we are inputting what "search" will be, needs to reassign this.state.search to that value
  render() {
    return (
      <div>
        <h1> Welcome! </h1>
        <div>
          <button id="Locations" type="button">
            Location
          </button>
        </div>
        <span style={this.styles} className="logo">
          {this.state.logo}
        </span>
        <div>
          <Link to="/mylocations">
            <button id="Items" type="button">
              Items
            </button>
          </Link>

          <Link to="/myitems">
            <button id="Locations" type="button">
              Locations
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Welcome;
