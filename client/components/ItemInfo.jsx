import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class ItemInfo extends Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    return (
      <div>
        <div>{this.props.item_name}</div>
        <button onClick={this.delete} type="button">
          Delete Item
        </button>
        <button type="button">Where is it?</button>
      </div>
    );
  }
}

export default withRouter(ItemInfo);
