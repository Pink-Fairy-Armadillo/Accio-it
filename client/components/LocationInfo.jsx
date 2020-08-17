import React, { Component } from 'react';

class LocationInfo extends Component {
  constructor(props) {
    super(props);
    this.clicked = false;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.clicked = !this.clicked;
    this.forceUpdate();
  }

  render() {
    const containers = this.props.containers.map((container, i) => (
      <p key={`container${i}`}>
        <b>Container: </b>
        {container}
      </p>
    ));
    const items = this.props.items.map((item, i) => (
      <p key={`item${i}`}>
        <b>Item: </b>
        {item}
      </p>
    ));
    const result = (
      <div>
        {containers}
        {items}
      </div>
    );

    return (
      <div className="item-div">
        <div className="item-div-name">{this.props.location}</div>

        <button type="button" onClick={(e) => this.handleClick(e)}>
          {this.clicked ? 'Less' : 'More'} info
        </button>
        {this.clicked && result}
      </div>
    );
  }
}

export default LocationInfo;
