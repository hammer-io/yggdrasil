import React from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as validator from './validator';
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    text: {
    },
    next: {
        marginLeft: 16,
        marginRight: 16,
    }
};
const paperstyle = {
    margin: 20,
    padding: 20,
    textAlign: 'center',
    display: 'inline-block',
};
class Radio extends React.Component {
    getValue() {
        return this.refs.myGroup.state.selected;
    }
    render() {
        return (
            <RadioButtonGroup ref ="myGroup" name={this.props.name} valueSelected={this.props.two}>
                <RadioButton
                    value={this.props.one}
                    label={this.props.one}
                    style={styles.radioButton}
                />
                <RadioButton
                    value={this.props.two}
                    label={this.props.two}
                    style={styles.radioButton}
                />
            </RadioButtonGroup>
        );
    }
}

class MyField extends React.Component {
    constructor() {
        super();
        this.state = {
            i: 0,
            name: "undefined",
            desc: "undefined",
            version: "undefined",
            author: "undefined",
            license: "undefined",
            src: "None",
            ci: "None",
            docker: "None",
            host: "None",
            framework: "None"
        };
    }

    goBack(prev) {
        this.setState({
            i: prev,
        });
    }

    saveInfo() {
        const name = this.checkName();
        const version = this.checkVersion();
        if(name && version){
            this.setState({
                i: this.state.i +1,
                name: this.refs.name.getValue(),
                desc: this.refs.desc.getValue(),
                version: this.refs.version.getValue(),
                author: this.refs.author.getValue(),
                license: this.refs.license.getValue(),
            });
        }
    }

    saveSrc() {
        const src = this.refs.src.getValue();
        var i = -1;
        if(src === "GitHub"){
            i = 2;
        } else {
            i = 5;
        }
        this.setState({
            src: src,
            i: i
        })
    }

    saveCi() {
        const ci = this.refs.ci.getValue();
        var i = -1;
        if(ci === "TravisCI"){
            i = 3;
        } else {
            i = 5;
        }
        this.setState({
            ci: ci,
            i: i
        })
    }

    saveDocker() {
        const docker = this.refs.docker.getValue();
        var i = -1;
        if(docker === "Docker"){
            i = 4;
        } else {
            i = 5;
        }
        this.setState({
            docker: docker,
            i: i
        })
    }

    saveHost() {
        const host = this.refs.host.getValue();
        var i = -1;
        if(host === "Heroku"){
            i = 5;
        } else {
            i = 0;
        }
        this.setState({
            host: host,
            i: i
        })
    }

    saveFramework() {
        const framework = this.refs.framework.getValue();
        this.setState({
            framework: framework,
            i: 6
        })
    }

    checkName() {
        var error = validator.validateProjectName(this.refs.name.getValue());
        if(error === true){
            this.setState({nameError: ""});
            return true;
        }else {
            this.setState({nameError: error});
            return false;
        }

    }

    checkVersion() {
        var error = validator.validateVersionNumber(this.refs.version.getValue());
        if(error === true){
            this.setState({versionError: ""});
            return true;
        }else {
            this.setState({versionError: error});
            return false;
        }
    }

    renderContents() {
        if(this.state.i===0){
            return(
                <div>
                    <h4>Enter some information about your project</h4>
                    <TextField
                        ref = {"name"}
                        hintText={"Project Name"}
                        floatingLabelText={"Project Name"}
                        style={styles.text}
                        errorText={this.state.nameError}
                        onChange={()=>this.checkName()}
                    /><br />
                    <TextField
                        ref = {"desc"}
                        hintText={"Project Description"}
                        floatingLabelText={"Project Description"}
                        style={styles.text}
                    /><br />
                    <TextField
                        ref = {"version"}
                        hintText={"Version"}
                        floatingLabelText={"Version"}
                        style={styles.text}
                        errorText={this.state.versionError}
                        onChange={()=>this.checkVersion()}
                    /><br />
                    <TextField
                        ref = {"author"}
                        hintText={"Author"}
                        floatingLabelText={"Author"}
                        style={styles.text}
                    /><br />
                    <TextField
                        ref = {"license"}
                        hintText={"License"}
                        floatingLabelText={"License"}
                        style={styles.text}
                    /><br />
                    <RaisedButton style ={styles.next} label="Next" primary={true} onClick={() => this.saveInfo() }/>
                </div>
                )
        }else if(this.state.i===1){
            return (<div>
                        <h4>Choose your source control</h4>
                        <Radio ref = "src" name = "source_control" default = "GitHub" one = "None" two = "GitHub"/><br />
                        <RaisedButton style ={styles.next} label="Back" primary={true} onClick={() => this.goBack(0) }/>
                        <RaisedButton style ={styles.next} label="Next" primary={true} onClick={() => this.saveSrc() }/>
                    </div>
            )
        }else if(this.state.i===2){
            return (<div>
                    <h4>Choose your CI tool</h4>
                    <Radio ref = "ci" name = "ci_tool" default = "None" one = "None" two = "TravisCI"/><br />
                    <RaisedButton style ={styles.next} label="Back" primary={true} onClick={() => this.goBack(1) }/>
                    <RaisedButton style ={styles.next} label="Next" primary={true} onClick={() => this.saveCi() }/>
                </div>
            )
        }else if(this.state.i===3){
            return (<div>
                    <h4>Choose your containerization tool</h4>
                    <Radio ref = "docker" name = "docker_option" default = "Docker" one = "None" two = "Docker"/><br />
                    <RaisedButton style ={styles.next} label="Back" primary={true} onClick={() => this.goBack(1) }/>
                    <RaisedButton style ={styles.next} label="Next" primary={true} onClick={() => this.saveDocker() }/>
                </div>
            )
        }else if(this.state.i===4){
            return (<div>
                    <h4>Choose your hosting service</h4>
                    <Radio ref = "host" name = "host" default = "Heroku" one = "None" two = "Heroku"/><br />
                    <RaisedButton style ={styles.next} label="Back" primary={true} onClick={() => this.goBack(1) }/>
                    <RaisedButton style ={styles.next} label="Next" primary={true} onClick={() => this.saveHost() }/>
                </div>
            )
        }else if(this.state.i===5){
            return (<div>
                    <h4>Choose your web application framework</h4>
                    <Radio ref = "framework" name = "framework" default = "ExpressJS" one = "None" two = "ExpressJS"/><br />
                    <RaisedButton style ={styles.next} label="Back" primary={true} onClick={() => this.goBack(1) }/>
                    <RaisedButton style ={styles.next} label="Finish" primary={true} onClick={() => this.saveFramework() }/>
                </div>
            )
        }else if(this.state.i===6){
            return (<div>
                    <h4>Name: {this.state.name}</h4><br/>
                    <h4>Description: {this.state.desc}</h4><br/>
                    <h4>Version: {this.state.version}</h4><br/>
                    <h4>Author: {this.state.author}</h4><br/>
                    <h4>License: {this.state.license}</h4><br/>
                    <h4>Source control: {this.state.src}</h4><br/>
                    <h4>CI Tool: {this.state.ci}</h4><br/>
                    <h4>Docker Tool: {this.state.docker}</h4><br/>
                    <h4>Hosting Service: {this.state.host}</h4><br/>
                    <h4>Framework: {this.state.framework}</h4><br/>
                </div>
            )
        }

    }

    render() {
        return(
        <Paper style={paperstyle} zDepth={1}>
            {this.renderContents()}
        </Paper>)

    };
}

const TextFieldExampleSimple = () => (
    <div>
        <MyField/>
    </div>
);

export default TextFieldExampleSimple;