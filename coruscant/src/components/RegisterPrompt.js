import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as validator from '../utils/validator';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            success: false
        }
    }

    checkUsername(newValue) {
        this.setState({username: newValue});
        var error = validator.validateUsername(newValue);
        if (error === true) {
            this.setState({usernameError: ""});
            return true;
        } else {
            this.setState({usernameError: error});
            return false;
        }
    }

    checkEmail(newValue) {
        this.setState({email: newValue});
        var error = validator.validateEmail(newValue);
        if (error === true) {
            this.setState({emailError: ""});
            return true;
        } else {
            this.setState({emailError: error});
            return false;
        }
    }

    checkPassword(newValue) {
        this.setState({password: newValue});
        var error = validator.validatePassword(newValue);
        if (error === true) {
            this.setState({passwordError: ""});
            return true;
        } else {
            this.setState({passwordError: error});
            return false;
        }
    }

    handleClick(event) {
        var self = this;
        var validEmail = this.checkEmail(this.state.email);
        var validPassword = this.checkPassword(this.state.password);
        var validUsername = this.checkUsername(this.state.username);
        if (validEmail && validPassword && validUsername) {
            console.log({
                "email": this.state.email,
                "username": this.state.username,
                "password": this.state.password
            });
            this.setState({success: true});
        }
    }

    renderPrompt() {
        return (
            <div>
                <h4>Create your personal account</h4>
                <TextField
                    hintText="Username"
                    floatingLabelText="Username"
                    errorText={this.state.usernameError}
                    onChange={(event, newValue) => this.checkUsername(newValue)}
                />

                <br/>
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    errorText={this.state.emailError}
                    onChange={(event, newValue) => this.checkEmail(newValue)}
                />
                <br/>
                <TextField
                    type="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    errorText={this.state.passwordError}
                    onChange={(event, newValue) => this.checkPassword(newValue)}
                />
                <br/>
                <RaisedButton label="Create an account" primary={true} style={style}
                              onClick={(event) => this.handleClick(event)}/>
            </div>
        );
    }

    renderSuccess() {
        return (
            <div>
                <h4>Account successfully created!</h4>
            </div>
        );
    }

    render() {
        if (!this.state.success) {
            return this.renderPrompt();
        } else {
            return this.renderSuccess();
        }
    }
}

const style = {
    margin: 15,
};
export default Register;