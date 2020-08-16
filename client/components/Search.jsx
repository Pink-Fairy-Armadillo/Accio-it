import React from 'react';
import { Link } from 'react-router-dom';

function Search(props) {
  let result;
  if (props.searchResult.length) {
    const item = props.searchResult[0];
    result = <div id="searchResult">
               <p><b>Item: </b>{item.item_name}</p>
               <p><b>Location: </b>{item.location}</p>
               <p><b>Container: </b>{item.container}</p>
             </div>;
  }

  return (
    <div>
      <header>
        <Link to="/welcome">
          <button className="home" type="button">
            Accio Home!
          </button>
        </Link>
      </header>
      <form>
        <h1 className="title">What can I help you find?</h1>
        <div id="search">
          <input
            type="text"
            placeholder="I'm looking for..."
            value={props.search}
            onChange={(e) => props.handleChange(e)}
          ></input>
          <input
            type="submit"
            value="Accio!"
            onClick={(e) => props.dbSearch(e, props.search)}
          />
        </div>
      </form>
      {result}
    </div>
  );
}

export default Search;
