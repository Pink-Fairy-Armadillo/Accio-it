import React from 'react';
import { Link } from 'react-router-dom';

function ItemInfo(props) {
  //component did mount to fetch location data from backend

  return (
    <div>
      <div>{props.item}</div>
      <button type="button">Delete Item</button>
      <button type="button">Where is it?</button>
    </div>
  );
}

export default ItemInfo;
