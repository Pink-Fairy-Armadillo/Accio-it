import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';

function App() {
  return <div>
    <Switch>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/reset">
        <ResetPassword />
      </Route>
      {/* Is the welcome page based on the user? */}
      <Route path="/welcome">
        <Welcome />
      </Route>
      <Route exact path='/'>
        <Login />
      </Route>
    </Switch>
  </div>;
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
