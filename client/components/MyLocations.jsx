import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LocationInfo from './LocationInfo';

class MyLocations extends Component {
  constructor(props) {
    super(props);
    this.locations = [];
  }

  componentDidMount() {
    (async () => {
      await this.props.dbLookup('locations');
      await this.props.dbLookup('allitems');
      this.locations = await this.props.locations.map((item, i) => (
        <LocationInfo
          key={`location${i}`}
          item={item.item_name}
          location={item.location}
          container={item.container}
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
        <div className="title">My Locations</div>
        <button type="button">add location ++</button>
        {(this.locations.length && this.locations) || `Please add some locations, ${this.props.name}!`}
      </div>
    );
  }
}

export default MyLocations;
