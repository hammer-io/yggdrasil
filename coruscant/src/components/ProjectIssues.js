import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Paper } from 'material-ui'
import { register } from './../actions/session'
import {List, ListItem} from 'material-ui/List';
import Merge from 'material-ui/svg-icons/communication/call-merge';
import MergeRequest from 'material-ui/svg-icons/image/transform';
import Completed from 'material-ui/svg-icons/alert/error';
import Uncompleted from 'material-ui/svg-icons/alert/error-outline';
import Divider from 'material-ui/Divider';

const styles = {
    header: {
        width: '40%',
        textAlign: 'left',
        display: 'inline-block',
        padding: 10,
        margin: 20,
        maxHeight: 300,
        overflow: 'auto'
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        display: 'inline-block',
        marginRight: 5,
        marginLeft: 5
    }
}

const mapDispatchToProps = {
    register
}

@connect(null, mapDispatchToProps)
class ProjectIssues extends Component {
    constructor(props) {
        super(props)
    }

    getIssueIcon(type) {
        switch(type) {
            case 'Completed':
                return (<Completed />)
            case 'Uncompleted':
                return (<Uncompleted />)
            case 'Merged':
                return (<Merge />)
            case 'MergeRequest':
                return (<MergeRequest />)
        }
    }

    renderIssues() {
        let ret = []
        for(var i in this.props.issues) {
            ret.push(this.renderIssue(this.props.issues[i]))
        }
        return ret
    }

    renderIssue(info) {
        return (
            <ListItem href={info.url}
                      primaryText={info.name}
                      secondaryText={info.date}
                      leftIcon={this.getIssueIcon(info.type)} />
        )
    }

    render() {
        return (
            <div style={styles.container}>
              <Paper style={styles.header}>
                  <div style={styles.headerText}>Recent Github Activity</div>
                  <Divider />
                  <List>
                      {this.renderIssues()}
                  </List>
              </Paper>
            </div>
        )
    }
}

ProjectIssues.propTypes = {
}



export default ProjectIssues
