import React from 'react';
import { Link } from 'react-router-dom';
import ItemInfo from './ItemInfo';

function MyItems(props) {
  //component did mount to fetch location data from backend

  const items = props.items.map((item, i) => {
    return <ItemInfo key={`item${i}`} item={item} />;
  });

  return (
    <div>
      <Link to="/welcome">
        <button className="home" type="button">
          Accio Home!
        </button>
      </Link>
      <div className="title">My Items</div>
      <button type="button">add item ++</button>
      {items}
    </div>
  );
}

export default MyItems;
