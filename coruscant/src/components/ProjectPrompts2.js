// import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import {setInformation} from "../actions/index";
// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
// import theme from "../../style/theme.js";
//
// const styles = {
//     select: {
//         textAlign: 'left'
//     },
//     next: {
//         marginLeft: 16,
//         marginRight: 16,
//     },
//     warning: {
//         color: 'orange'
//     }
// };
//
// class myProjectPrompts extends Component {
//     componentDidMount() {
//         document.title = "Hammer.io - Create New Project";
//     }
//
//     updateInfo(newInfo) {
//         let info = {
//             name: this.refs.name.getValue(),
//             desc: this.refs.desc.getValue(),
//             version: this.refs.version.getValue(),
//             author: this.refs.author.getValue(),
//             license: this.refs.license.getValue(),
//             ...newInfo
//         };
//
//         this.props.update(info);
//     }
//
//     render() {
//         return (
//             <div>
//                 <div style={theme.simplePadding}>
//                     <h4>Enter some information about your project</h4>
//                     <TextField
//                         ref={"name"}
//                         hintText={"Project Name"}
//                         floatingLabelText={"Project Name"}
//                         onChange={() => this.updateInfo()}
//                     /><br/>
//                     <TextField
//                         ref={"desc"}
//                         hintText={"Project Description"}
//                         floatingLabelText={"Project Description"}
//                         onChange={() => this.updateInfo()}
//                     /><br/>
//                     <TextField
//                         ref={"version"}
//                         hintText={"Version"}
//                         floatingLabelText={"Version"}
//                         onChange={() => this.updateInfo()}
//                     /><br/>
//                     <TextField
//                         ref={"author"}
//                         hintText={"Author"}
//                         floatingLabelText={"Author"}
//                         onChange={() => this.updateInfo()}
//                     /><br/>
//                     <TextField
//                         ref={"license"}
//                         hintText={"License"}
//                         floatingLabelText={"License"}
//                         onChange={() => this.updateInfo()}
//                     /><br/>
//                     <h4>Choose which services to integrate into your project</h4>
//                     <SelectField
//                                  floatingLabelText="Source control"
//                                  style={styles.select}
//                                  value={this.props.info.src}
//                                  disabled={false}
//              onChange={(event,index,values) => this.updateInfo({src: values})}>
//                         <MenuItem value={'GitHub'} primaryText="GitHub" />
//                         <MenuItem value={'None'} primaryText="None" />
//                     </SelectField>
//                     <br />
//                     <SelectField floatingLabelText="CI tool"
//                                  style={styles.select}
//                                  value={this.props.info.ci}
//                                  disabled={checkIfIsNone(this.props.info.src)}
//                                  errorStyle={styles.warning}
//                errorText={this.props.info.src === 'None'?'Source control required to use':''}
//                onChange={(event,index,values) => this.updateInfo({ci: values})}>
//                         <MenuItem value={'TravisCI'} primaryText="TravisCI" />
//                         <MenuItem value={'None'} primaryText="None" />
//                     </SelectField>
//                     <br />
//                     <SelectField floatingLabelText="Containerization tool"
//                                  style={styles.select}
//                                  value={this.props.info.docker}
//                                  disabled={checkIfIsNone(this.props.info.ci)}
//                                  errorStyle={styles.warning}
//            errorText={this.props.info.ci === 'None'?'CI tool required to use':''}
//            onChange={(event,index,values) => this.updateInfo({docker: values})}>
//                         <MenuItem value={'Docker'} primaryText="Docker" />
//                         <MenuItem value={'None'} primaryText="None" />
//                     </SelectField>
//                     <br />
//                     <SelectField
//                          floatingLabelText="Hosting service"
//                          style={styles.select}
//                          value={this.props.info.host}
//                          disabled={checkIfIsNone(this.props.info.docker)}
//                          errorStyle={styles.warning}
//          errorText={this.props.info.docker === 'None'?'Containerization required to use':''}
//                          onChange={(event,index,values) => this.updateInfo({host: values})}>
//                         <MenuItem value={'Heroku'} primaryText="Heroku" />
//                         <MenuItem value={'None'} primaryText="None" />
//                     </SelectField>
//                     <br />
//                     <SelectField
//                          floatingLabelText="Web application framework"
//                          style={styles.select}
//                          value={this.props.info.framework}
//                          disabled={false}
//                          onChange={(event,index,values) => this.updateInfo({framework: values})}>
//                         <MenuItem value={'ExpressJS'} primaryText="ExpressJS" />
//                         <MenuItem value={'None'} primaryText="None" />
//                     </SelectField>
//                     <br />
//                     <RaisedButton style={styles.next}
//    label="Create Project" primary={true} onClick={()=>{console.log(this.props.info)}}/>
//                 </div>
//             </div>
//         );
//     }
// }
//
// const checkIfIsNone = value => {
//     return value === 'None';
// }
//
// const mapStateToProps = state => {
//     return {
//         info: state.newProjectInfo
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         update: (info) => {
//             dispatch(setInformation(info))
//         }
//     }
// }
//
// const ProjectPrompts = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(myProjectPrompts)
//
// export default ProjectPrompts;
