import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { join } from path;
import Login from './Login';
import Welcome from './Welcome';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import MyItems from './MyItems';
import MyLocations from './MyLocations';
import Forgotinfo from './ForgotInfo';
import Search from './Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'Accio!',
      search: '',
      locations: ['kitchen', 'storage', 'living room'],
      items: ['sawyer', 'lizzy', 'dodo'],
      container: ['box', 'drawer', 'floor'],
    };
    this.itemLookup = this.itemLookup.bind(this);
    this.locationLookup = this.locationLookup.bind(this);
    this.containerLookup = this.containerLookup.bind(this);
  }

  // Fetch requests for items, and locations
  async itemLookup(event) {
    // Create dynamic url based on search information
    const url = join('http://localhost:3000/api/items', userID);
    event.preventDefault();
    try {
      let response = await fetch(url, {});
      response.json();
      this.setState({ items: response });
    } catch (error) {
      console.log('Error in APP.jsx itemLookup: ', error);
    }
  }

  async locationLookup(event) {
    const url = join('http://localhost:3000/api/location/', userID);
    event.preventDefault();
    try {
      let response = await fetch(url, {});
      response.json();
      this.setState({ location: response });
    } catch (error) {
      console.log('Error in APP.jsx locationLookup: ', error);
    }
  }

  async containerLookup(event) {
    const url = join('http://localhost:3000/api/container/', userID);
    event.preventDefault();
    try {
      let response = await fetch(url, {});
      response.json();
      this.setState({ container: response });
    } catch (error) {
      console.log('Error in APP.jsx containerLookup: ', error);
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
            <MyItems items={this.state.items} />
          </Route>
          <Route path="/mylocations">
            <MyLocations locations={this.state.locations} />
          </Route>
          <Route path="/reset">
            <ResetPassword />
          </Route>
          <Route path="/search">
            <Search search={this.state.search} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/welcome">
            <Welcome logo={this.state.logo} />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
