import React, { Component } from 'react';
<<<<<<< HEAD
=======
import { Link, withRouter } from 'react-router-dom';
>>>>>>> deleting

class ItemInfo extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.clicked = false;
    this.result = <div>
                    <p><b>Location: </b>{this.props.location}</p>
                    <p><b>Container: </b>{this.props.container}</p>
                  </div>;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.clicked = !this.clicked;
    this.forceUpdate();
=======
    this.delete = this.delete.bind(this);
  }

  async delete() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/delete/${this.props.userId}/${this.props.item_name}`,
        {
          method: 'DELETE',
          body: JSON.stringify({
            userId: this.props.userId,
            item_name: this.props.item_name,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response);
      if (response.status === 200) {
        this.forceUpdate();
        this.props.history.replace('/welcome');
      }
      this.forceUpdate();
    } catch (error) {
      console.log('Error in delete of iteminfo:', error);
    }
>>>>>>> deleting
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <div>{this.props.item}</div>
        <button type="button">Delete Item</button>
        <button type="button" onClick={(e) => this.handleClick(e)}>{this.clicked ? 'Show me less' : 'Where is it?'}</button>
        {this.clicked && this.result}
=======
        <div>{this.props.item_name}</div>
        <button onClick={this.delete} type="button">
          Delete Item
        </button>
        <button type="button">Where is it?</button>
>>>>>>> deleting
      </div>
    );
  }
}

export default withRouter(ItemInfo);
