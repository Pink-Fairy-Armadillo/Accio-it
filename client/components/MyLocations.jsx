import React from 'react';
import { Link } from 'react-router-dom';
import LocationInfo from './LocationInfo';

function MyLocations(props) {
  //component did mount to fetch location data from backend

  const locations = props.locations.map((item, i) => {
    return <LocationInfo key={`location${i}`} location={item} />;
  });

  return (
    <div>
      <Link to="/welcome">
        <button className="home" type="button">
          Accio Home!
        </button>
      </Link>
      <div className="title">My Locations</div>
      <Link to="/newlocation">
        <button type="button">add location ++</button>
      </Link>
      {locations}
    </div>
  );
}

export default MyLocations;
