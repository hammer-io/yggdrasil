import React from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import {toggleSideMenu} from "../actions/index";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

const sidebarStyle = {
    backgroundColor: '#46523c'
};

class SideMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Drawer open={this.props.open}>
                    <AppBar title="hammer.io"
                            style = {sidebarStyle}
                            showMenuIconButton={false}
                            onRightIconButtonTouchTap={this.props.onClick}
                            iconElementRight={<IconButton><Close /></IconButton>}/>
                    <MenuItem
                        primaryText='Home'
                        containerElement={<Link to="/" />}
                    onTouchTap={() => {
                    console.log('going home')
                    alert('going home!')
                }}/>
                    <MenuItem
                        containerElement={<Link to="/login" />}>Login</MenuItem>
                    <MenuItem
                        onClick={()=>{this.props.history.push('/signup')}}>Register</MenuItem>
                    <MenuItem
                        containerElement={<Link to="/newproject" />}>New Project</MenuItem>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        open: state.menuOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: () => {
            dispatch(toggleSideMenu())
        }
    }
}

const movingMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenu)

export default movingMenu