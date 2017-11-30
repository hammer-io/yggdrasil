import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextFieldExampleSimple from '../components/ProjectPrompts';
import Login from "../components/LoginPrompt";
import Paper from 'material-ui/Paper';
import Register from "../components/RegisterPrompt";
import HomePage from "../components/HomePage";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SideMenu from "../components/SideMenu";
import { connect } from 'react-redux'
import AppBarMenu from "../components/AppBarMenu";
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

const tab = {
    paddingLeft: 256
};



class myApp extends Component {
    render() {
        return (
            <MuiThemeProvider>
                    <Router>
                        <div style = {this.props.open?tab:{}}>
                            <Route path="/:id" component={AppBarMenu}/>
                            <Route exact path="/" component={AppBarMenu}/>
                            <Link to="/newproject" >Dear Nischay, this link doesn't work</Link>
                            <Route path="/" render={(props) => <SideMenu {...props}/>} />

                            <div style = {center}>
                                <Paper style={paperstyle} zDepth={1}>
                                    <Route exact path="/" component={HomePage} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/newproject" component={TextFieldExampleSimple} />
                                    <Route exact path="/signup" component={Register} />
                                </Paper>
                            </div>
                        </div>
                    </Router>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return {
        open: state.menuOpen
    }
}

const App = connect(
    mapStateToProps, ()=>({})
)(myApp)

export default App