import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import MyItems from './MyItems';
import MyLocations from './MyLocations';
import Forgotinfo from './ForgotInfo';
import Search from './Search';
import NewItem from './NewItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '1',
      preferred_name: 'Hagrid',
      allitems: [],
      containers: [],
      locations: [],
      searchResult: [],
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.dbSearch = this.dbSearch.bind(this);
    this.dbLookup = this.dbLookup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // handleChange for search bar functionality
  handleChange(event) {
    event.preventDefault();
    this.setState({ search: event.target.value });
  }

  handleLogin(response) {
    this.setState({
      userId: response.userId,
      preferred_name: response.preferred_name,
    });
  }

  async dbLookup(path) {
    try {
      // Get requests. 'path' is (allItems || containers || locations)
      const response = await (
        await fetch(`http://localhost:3000/api/${path}/${this.state.userId}`)
      ).json();
      this.setState({ [path]: response });
      console.log(response);
    } catch (error) {
      console.log(`Error in APP.jsx ${path} dbLookup: `, error);
    }
  }

  async dbSearch(event, search) {
    event.preventDefault();
    try {
      const response = await (
        await fetch(
          `http://localhost:3000/api/getItem/${this.state.userId}/${search}`,
        )
      ).json();
      this.setState({ searchResult: response });
    } catch (error) {
      console.log('Error in APP.jsx dbSearch: ', error);
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/forgotinfo">
            <Forgotinfo />
          </Route>
          <Route path="/myitems">
            <MyItems
              id={this.state.userId}
              items={this.state.allitems}
              name={this.state.preferred_name}
              dbLookup={this.dbLookup}
            />
          </Route>
          <Route path="/mylocations">
            <MyLocations
              id={this.state.userId}
              locations={this.state.locations}
              name={this.state.preferred_name}
              dbLookup={this.dbLookup}
            />
          </Route>
          <Route path="/reset">
            <ResetPassword />
          </Route>
          <Route path="/search">
            <Search
              id={this.state.userId}
              search={this.state.search}
              searchResult={this.state.searchResult}
              dbSearch={this.dbSearch}
              handleChange={this.handleChange}
            />
          </Route>
          <Route path="/signup">
            <SignUp handleLogin={this.handleLogin} />
          </Route>
          <Route path="/welcome">
            <Welcome name={this.state.preferred_name} />
          </Route>
          <Route exact path="/">
            <Login handleLogin={this.handleLogin} />
          </Route>
          <Route path="/newitem">
            <NewItem userId={this.state.userId} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
