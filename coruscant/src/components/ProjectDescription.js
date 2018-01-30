import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import { register } from './../actions/session'
import ReactMarkdown from 'react-markdown'
import Divider from 'material-ui/Divider';

const styles = {
    header: {
        width: '40%',
        textAlign: 'left',
        display: 'inline-block',
        padding: 10,
        margin: 20,
        maxHeight: 500,
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
class ProjectDescription extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={styles.container}>
              <Paper style={styles.header}>
                  <div style={styles.headerText}>Project Description</div>
                  <Divider />
                  <p>
                      <ReactMarkdown source={this.props.content} />
                  </p>
              </Paper>
            </div>
        )
    }
}

ProjectDescription.propTypes = {
    content: PropTypes.string.isRequired
}



export default ProjectDescription
