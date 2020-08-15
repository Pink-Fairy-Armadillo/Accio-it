import React from 'react';
import { Link } from 'react-router-dom';

function Search(props) {
  return (
    <div>
      <header>
        <Link to="/welcome">
          <button className="home" type="button">
            Accio Home!
          </button>
        </Link>
      </header>
      <div>
        <h1 className="title">What can I help you find?</h1>
        <form>
          <div id="search">
            <input
              defaultValue="I\'m looking for..."
              value={props.search}
              type="text"
              onChange={props.searchSubmit}
            ></input>
            <input type="submit" value="Accio!" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
