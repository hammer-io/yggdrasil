import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextFieldExampleSimple from '../components/ProjectPrompts';
import Login from "../components/LoginPrompt";
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Register from "../components/RegisterPrompt";
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Gavel from 'material-ui/svg-icons/action/gavel';
import HomePage from "../components/HomePage";
import {white} from 'material-ui/styles/colors';

const paperstyle = {
    margin: 20,
    padding: 20,
    textAlign: 'center',
    display: 'inline-block'
};

const center = {
    textAlign: 'center',
    display: 'block'
};

class LoginButton extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton {...this.props} label="Login"/>
        );
    }
}

class SignOut extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton {...this.props} label="Sign Out"/>
        );
    }
}

class DropMenu extends Component {
    static muiName = 'IconMenu';

    render() {
        return (
            <IconMenu
                {...this.props}
                iconButtonElement={
                    <IconButton><Gavel color={white}/></IconButton>
                }
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
                <MenuItem primaryText="Home" onClick={() => this.props.setPage('Home')}/>
                <MenuItem primaryText="Create New Project" onClick={() => this.props.setPage('NewProject')}/>
                <MenuItem primaryText="Log in" onClick={() => this.props.setPage('LogIn')}/>
                <MenuItem primaryText="Sign Up" onClick={() => this.props.setPage('SignUp')}/>
            </IconMenu>
        );
    }
}

class AppBarMenu extends Component {
    setLogged(value) {
        this.props.onClick(value);
        if (!value) {
            this.props.setPage("LogIn");
        }
    }

    render() {
        return (
            <div>
                <AppBar
                    title={"Hammer-io : " + this.props.page}
                    iconElementLeft={<DropMenu setPage={(value) => this.props.setPage(value)}/>}
                    iconElementRight={this.props.page === 'LogIn' || this.props.page === 'SignUp' ? null : (this.props.logged ?
                        <SignOut onClick={() => this.props.signOut()}/> :
                        <LoginButton onClick={() => this.setLogged(false)}/>)}
                />
            </div>
        );
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            currentPage: 'Home'
        };
    }

    setLogged(logged) {
        this.setState({
            logged: logged
        })
    }

    setPage(page) {
        this.setState({
            currentPage: page
        })
    }

    login() {
        this.setPage("Home");
        this.setLogged(true);
    }

    signout() {
        this.setPage("Home");
        this.setLogged(false);
    }

    renderContent() {
        switch (this.state.currentPage) {
            case "Home":
                return (
                    <HomePage/>
                );
            case "NewProject":
                return (
                    <TextFieldExampleSimple/>
                );
            case "LogIn":
                return (
                    <Login login={() => this.login()}/>
                );
            case "SignUp":
                return (
                    <Register/>
                );
        }
    }

    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <AppBarMenu onClick={(logged) => this.setLogged(logged)} logged={this.state.logged}
                                page={this.state.currentPage}
                                setPage={(page) => this.setPage(page)}
                                signOut={() => this.signout()}/>
                </MuiThemeProvider>
                <div style = {center}>
                    <Paper style={paperstyle} zDepth={1}>
                        {this.renderContent()}
                    </Paper>
                </div>
            </div>
        )
    }
}
