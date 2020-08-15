import React from 'react';
import { Link } from 'react-router-dom';

function Welcome(props) {
  return (
    <div>
      <h1> Welcome! </h1>
      <div>
        <button id="Locations" type="button">
          Location
        </button>
      </div>
      <span className="logo">{props.logo}</span>
      <div>
        <Link to="/mylocations">
          <button id="Items" type="button">
            Items
          </button>
        </Link>
        <Link to="/myitems">
          <button id="Locations" type="button">
            Locations
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Welcome;
