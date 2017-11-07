import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleClick(event) {
        this.props.login();
    }

    render() {
        return (
            <div>
                <h4>Sign in to Hammer-io</h4>
                <TextField
                    hintText="Username"
                    floatingLabelText="Username"
                    onChange={(event, newValue) => this.setState({username: newValue})}
                />
                <br/>
                <TextField
                    type="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    onChange={(event, newValue) => this.setState({password: newValue})}
                />
                <br/>
                <RaisedButton label="Sign in" primary={true} style={style}
                              onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }
}

const style = {
    margin: 15,
};
export default Login;