import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as validator from '../utils/validator';
import { connect } from 'react-redux';
import theme from "../../style/theme.js";

const style = {
    margin: 15,
};

class myRegister extends Component {

    componentDidMount() {
        document.title = "Hammer.io - Register";
    }

    updateUsername() {
        var info = {username: this.refs.username.getValue()};
        this.props.updateUsername(info);
    }

    updateEmail() {
        var info = {email: this.refs.email.getValue()};
        this.props.updateEmail(info);
    }

    updatePassword() {
        var info = {password: this.refs.password.getValue()};
        this.props.updatePassword(info);
    }

    submitForm() {
        var credentials = {
            username: this.props.info.username,
            email: this.props.info.email,
            password:this.props.info.password
        }
        if((credentials.username===""
                ||credentials.email===""
                ||credentials.password==="")
            ||!(this.props.info.usernameError===""&&this.props.info.emailError==="" &&this.props.info.passwordError==="")) {
            console.log('Field is empty or there is an error')
        } else {
            console.log('Submitting credentials...')
            // Do something with credentials
        }
    }

    render() {
        return (
            <div style={theme.simplePadding}>
                <h4>Create your personal account</h4>
                <TextField
                    ref={"username"}
                    hintText="Username"
                    floatingLabelText="Username"
                    errorText={this.props.info.usernameError}
                    onChange={() => this.updateUsername()}
                />

                <br/>
                <TextField
                    ref={"email"}
                    hintText="Email"
                    floatingLabelText="Email"
                    errorText={this.props.info.emailError}
                    onChange={() => this.updateEmail()}
                />
                <br/>
                <TextField
                    ref={"password"}
                    type="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    errorText={this.props.info.passwordError}
                    onChange={() => this.updatePassword()}
                />
                <br/>
                <RaisedButton label="Create an account"
                              primary={true}
                              style={style}
                              // disabled={(this.props.info.username===""||this.props.info.email===""||this.props.info.password==="")||!(this.props.info.usernameError==="" &&this.props.info.emailError==="" &&this.props.info.passwordError==="")}
                              onClick={() => this.submitForm()}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        info: state.registerInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUsername: (info) => {
            dispatch({
                type: 'SET_REGISTER_INFORMATION_USERNAME',
                info
            })
        },
        updateEmail: (info) => {
            dispatch({
                type: 'SET_REGISTER_INFORMATION_EMAIL',
                info
            })
        },
        updatePassword: (info) => {
            dispatch({
                type: 'SET_REGISTER_INFORMATION_PASSWORD',
                info
            })
        }
    }
}

const Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(myRegister)
export default Register;