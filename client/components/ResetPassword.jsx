import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Resetpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Link to="/welcome">
                <button className="home" type="button">
                    Accio Home!
                </button>
                </Link>
                <form>
                    Username:
                    <input type="text">
                    </input>
                </form>
                <form>
                    New Password:
                    <input type="password">
                    </input>
                </form>
            </div>
         );
    }
}
 
export default Resetpassword;