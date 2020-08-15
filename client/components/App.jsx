import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import MyItems from './MyItems';
import MyLocations from './MyLocations';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'Accio!',
      search: '',
      locations: ['kitchen', 'storage', 'living room'],
      items: ['sawyer', 'lizzy', 'dodo'],
    };
    this.styles = {
      fontSize: 50,
      fontWeight: 'bold',
    };
    this.itemLookup = this.itemLookup.bind(this);
  }

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
      // logic for what we want it to do after signup (if response is 200 or not)
    } catch (error) {
      console.log('Error in signUpSubmit: ', error);
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup">
            <SignUp />
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
          {/* Is the welcome page based on the user? */}
          <Route path="/welcome">
            <Welcome />
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
