import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemInfo from './ItemInfo';

class MyItems extends Component {
  constructor(props) {
    super(props);
    this.items = [];
    this.clicked = false;
  }

  componentDidMount() {
    (async () => {
      await this.props.dbLookup('allitems');
      this.items = await this.props.items.map((item, i) => (
        <ItemInfo
          key={`item${i}`}
          item_name={item.item_name}
          userId={this.props.userId}
        />
      ));
      this.forceUpdate();
    })();
  }

  render() {
    return (
      <div>
        <Link to="/welcome">
          <button className="home" type="button">
            Accio Home!
          </button>
        </Link>
        <div className="title">My Items</div>
        <Link to="/newitem">
          <button type="button">add item ++</button>
        </Link>
        {(this.items.length && this.items) ||
          `Please add some items, ${this.props.name}!`}
      </div>
    );
  }
}

export default MyItems;
