import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Theme from '../../style/theme'
import PageWrap from '../components/PageWrap'
import {Card, FloatingActionButton, GridList, GridTile, Paper, RaisedButton, Tab, Tabs, TextField} from 'material-ui';

const styles = {
  card: {
    width: 'fluid',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  container: {
    padding: Theme.padding.tiny
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Theme.padding.large
  }
}

// const mapStateToProps = state => ({
//   session: state.session,
//   projects: state.projects
// })
//
// const mapDispatchToProps = {
//   getProjects,
//   getUserProjects
// }

// @connect(mapStateToProps, mapDispatchToProps)
class UserSettings extends Component {
  constructor(props) {
    super(props)

    // this.viewProject = this.viewProject.bind(this)
    // this.newProject = this.newProject.bind(this)
  }

  async componentDidMount() {
    // const { session, getProjects, getUserProjects } = this.props
    // await getProjects(session.authToken)
    // await getUserProjects(session.authToken)
  }

/*  viewProject(projectId) {
    this.props.history.push(`/projects/${projectId}`)
  }

  newProject() {
    this.props.history.push('/projects/new')
  }

  renderProjects() {
    const { projects } = this.props
    if (projects && projects.fetchedUserProjects) {
      const ownedProjects = _.values(projects.owned.byId)
      const contributedProjects = _.values(projects.contributed.byId)
      const userProjects = [...ownedProjects, ...contributedProjects]
      if (userProjects.length > 0) {
        return (
          <div style={styles.container}>
            <ProjectList projects={userProjects} viewProject={this.viewProject} />
          </div>
        )
      }
      return <ProjectsNotFound />
    }
    return (
      <div style={styles.spinnerContainer}>
        <Spinner />
      </div>
    )
  }*/

  renderTabs(){
    function onClickSaveProfile() {
      // TODO
      console.log("TODO");
    }
    return (
      <Tabs>
        <Tab label="Profile">
          <div style={styles.container}>
            <h2>Profile Settings</h2>
            <TextField
              floatingLabelText="Username"
              defaultValue="Bob"
              disabled={true}
            /><br/>
            <TextField
              floatingLabelText="Email"
              defaultValue="bob@afv.com"
            /><br/>
            <TextField
              floatingLabelText="First Name"
              defaultValue="Bob"
            />
            <TextField
              floatingLabelText="Last Name"
              defaultValue="Sagat"
            /><br/>
            <br/>
            <RaisedButton label="Save Changes" primary={true} onClick={onClickSaveProfile} />
          </div>
        </Tab>
        <Tab label="Email" >
          <div style={styles.container}>
            <h2>Email Settings</h2>
            <p>
              TODO: This is another example tab.
            </p>
          </div>
        </Tab>
      </Tabs>
    )
  }

  render() {
    return (
      <PageWrap
        title="Settings"
        renderContents={this.renderTabs}
      />
    )
  }
}

export default withRouter(UserSettings)
