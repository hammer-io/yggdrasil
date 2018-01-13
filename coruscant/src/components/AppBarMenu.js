import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {logOut, toggleSideMenu} from "../actions/index";
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';

class LoginButton extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton {...this.props} label="Login"/>
        );
    }
}

class SignOutButton extends Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton {...this.props} label="Sign Out"/>
        );
    }
}

class myAppBarMenu extends Component {
    render() {
        let title = 'Welcome';
        let route = this.props.match.params.id;
        if(route){
            switch(route.toLowerCase()) {
                case 'newproject':
                    title = 'Create New Project';
                    break;
                case 'login':
                    title = 'LoginPrompt';
                    break;
                case 'signup':
                    title = 'Register';
                    break;
                default:
            }
        }
        return (
            <div>
                <AppBar
                    title={title}
                    style={{backgroundColor: '#fbab18'}}
                    showMenuIconButton={!this.props.open}
                    onLeftIconButtonTouchTap={this.props.onClick}
                    iconElementLeft={<IconButton><Menu /></IconButton>}
                    iconElementRight={route === 'login' || route === 'signup' ? null : (this.props.userID !== -1 ?
                        <SignOutButton onClick={this.props.signOut}/> :
                        <LoginButton onClick={() => {console.log('This should route to sign in')}}/>)}
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        open: state.menuOpen,
        userID: state.userID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: () => {
            dispatch(toggleSideMenu())
        },
        signOut: () => {
            dispatch(logOut())
        }
    }
}

const AppBarMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(myAppBarMenu)

export default AppBarMenu