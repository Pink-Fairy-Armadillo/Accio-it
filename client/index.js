import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';

render(
  <Router>
    <Login />
  </Router>,
  document.getElementById('root'),
);
