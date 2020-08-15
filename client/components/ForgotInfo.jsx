import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Forgotinfo extends Component {

    render() { 
        return (
        <div>
            <h1>
                Should'va used the Google Oauth!
            </h1>
            <div>
                <Link to="/reset">
                <button id="ResetPassword" type="button">Reset Password</button>
                </Link>
            </div>
        </div>
        );
    }
}
 
export default Forgotinfo;