import React from 'react';
import { Link } from 'react-router-dom';

function Welcome(props) {
  return (
    <div>
      <h1> Welcome, {props.name}! </h1>
      <div></div>
      <span className="logo">Accio!</span>
      <div>
        <Link to="/myitems">
          <button id="Items" type="button">
            Items
          </button>
        </Link>
        <Link to="/mylocations">
          <button id="Locations" type="button">
            Locations
          </button>
        </Link>
        <Link to="/search">
          <button type="button">Accio it!</button>
        </Link>
      </div>
      <Link to="/reset">
        <button id="ResetPassword" type="button">
          Reset Password
        </button>
      </Link>
    </div>
  );
}
export default Welcome;
