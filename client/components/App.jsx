import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
    };
    this.itemLookup = this.itemLookup.bind(this);
  }

  // Fetch requests for items, and locations
  async itemLookup(event) {
    event.preventDefault();
    try {
      const response = await fetch('url', {
        method: 'POST',
        body: JSON.stringify({ search: this.state.search }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Update state with result from fetch request
      // this.setState({ dynamicllyAssignedKey: response });
    } catch (error) {
      console.log('Error in signUpSubmit: ', error);
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
            <Search search={this.props.search} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/welcome">
            <Welcome logo={this.props.logo} />
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
