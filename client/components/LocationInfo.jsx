import React from 'react';
import { Link } from 'react-router-dom';

function LocationInfo(props) {
  //component did mount to fetch location data from backend

  return (
    <div>
      <div>{props.location}</div>
      <button type="button">Delete Location</button>
      <button type="button">What Items Are Here?</button>
    </div>
  );
}

export default LocationInfo;
