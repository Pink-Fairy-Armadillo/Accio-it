import React, { Component } from 'react';

class LocationInfo extends Component {
  constructor(props) {
    super(props);
    this.clicked = false;
    this.result = <div>
                    <p><b>Container: </b>{this.props.containers}</p>
                    <p><b>Items: </b>{this.props.items}</p>
                  </div>;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.clicked = !this.clicked;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div>{this.props.location}</div>
        <button type="button">Delete Location</button>
        <button type="button" onClick={(e) => this.handleClick(e)}>{this.clicked ? 'Less' : 'More'} info</button>
      </div>
    );
  }
}

export default LocationInfo;
