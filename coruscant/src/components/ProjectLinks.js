import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import { register } from './../actions/session'
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
    },
    bodyText: {
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontSize: 16,
        display: 'block',
        marginRight: 5,
        marginLeft: 5
    },
}

const mapDispatchToProps = {
    register
}

@connect(null, mapDispatchToProps)
class ProjectLinks extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={styles.container}>
              <Paper style={styles.header}>
                  <div style={styles.headerText}>Connected Services</div>
                  <Divider />
                  <div style={styles.bodyText}><b>Github:</b> <a href={this.props.githubUrl}>{this.props.githubUrl}</a>   </div>
                  <div style={styles.bodyText}><b>Travis-ci:</b> <a href={this.props.travisUrl}>{this.props.travisUrl}</a>   </div>
                  <div style={styles.bodyText}><b>Heroku:</b> <a href={this.props.herokuUrl}>{this.props.herokuUrl}</a>   </div>

              </Paper>
            </div>
        )
    }
}

ProjectLinks.propTypes = {
    content: PropTypes.string.isRequired
}

export default ProjectLinks
