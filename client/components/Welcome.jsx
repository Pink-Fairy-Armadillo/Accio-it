import React, { Component } from 'react';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'Accio!',
    };
    this.styles = {
      fontSize: 50,
      fontWeight: 'bold',
    };
  }

  render() {
    return (
        <div>
          <h1> Welcome! </h1>
          <div> <button id="Locations" type="button">Location</button> </div>
          <span style={this.styles} className="logo">{this.state.logo}</span>
          <div><button id="Items" type="button" >Items</button></div>
        </div>
    );
  }
}
export default Welcome;
