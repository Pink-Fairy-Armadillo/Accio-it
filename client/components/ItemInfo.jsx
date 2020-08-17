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
          {this.props.loc}
        </p>
        <p>
          <b>Container: </b>
          {this.props.container}
        </p>
      </div>
    );
    this.handleClick = this.handleClick.bind(this);
    this.delete = this.delete.bind(this);
  }

  async delete() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete/${this.props.userId}/${this.props.item}`,
        {
          method: 'DELETE',
          body: JSON.stringify({
            userId: this.props.userId,
            item: this.props.item,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // console.log(response);
      if (response.status === 200) {
        this.forceUpdate();
        this.props.history.replace('/welcome');
      }
      this.forceUpdate();
    } catch (error) {
      console.log('Error in delete of iteminfo:', error);
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.clicked = !this.clicked;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="item-div">
        <div className="item-div-name">{this.props.item}</div>
        <button onClick={this.delete} type="button">
          Delete Item
        </button>
        <button type="button" onClick={(e) => this.handleClick(e)}>
          {this.clicked ? 'Show me less' : 'Where is it?'}
        </button>
        {this.clicked && this.result}
      </div>
    );
  }
}

export default withRouter(ItemInfo);
