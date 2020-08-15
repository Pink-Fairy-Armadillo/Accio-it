import React, { Component } from 'react';

class Resetpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
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