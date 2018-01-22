// import React, {Component} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
// import theme from "../../style/theme.js";
//
// class LoginPrompt extends Component {
//
//     componentDidMount() {
//         document.title = "Hammer.io - LoginPrompt";
//     }
//
//     submitForm() {
//         let credentials = {
//             username: this.refs.username.getValue(),
//             password: this.refs.password.getValue()
//         };
//         console.log('Logging in...');
//         // Do something with credentials
//     }
//
//     render() {
//         return (
//             <div style={theme.simplePadding}>
//                 <h4>Sign in to Hammer-io</h4>
//                 <TextField
//                     ref={'username'}
//                     hintText="Username"
//                     floatingLabelText="Username"
//                 />
//                 <br/>
//                 <TextField
//                     ref={'password'}
//                     type="password"
//                     hintText="Password"
//                     floatingLabelText="Password"
//                 />
//                 <br/>
//                 <RaisedButton label="Sign in"
//                               primary={true}
//                               onClick={() => this.submitForm()}/>
//             </div>
//         );
//     }
// }
//
// export default LoginPrompt;