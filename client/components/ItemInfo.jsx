import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class ItemInfo extends Component {
  constructor(props) {
    super(props);
    this.clicked = false;
    this.result = (
      <div>
        <p>
          <b>Location: </b>
          {this.props.location}
        </p>
        <p>
          <b>Container: </b>
          {this.props.container}
        </p>
      </div>
    );
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
        <div>{this.props.item}</div>
        <button type="button">Delete Item</button>
        <button type="button" onClick={(e) => this.handleClick(e)}>
          {this.clicked ? 'Show me less' : 'Where is it?'}
        </button>
        {this.clicked && this.result}
      </div>
    );
  }
}

export default withRouter(ItemInfo);
