import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getProjects, getUserProjects } from '../actions/project'
import Theme from '../../style/theme'
import BasicSpinner from '../components/misc/BasicSpinner'
import ProjectList from '../components/home/ProjectList'
import FloatingActionButton from '../components/misc/FloatingActionButton'
import FeatureDiscovery from '../components/home/feature-discovery'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: Theme.padding.regular
  }
}

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects
})

const mapDispatchToProps = {
  getProjects,
  getUserProjects
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
    this.viewProject = this.viewProject.bind(this)
    this.newProject = this.newProject.bind(this)
    this.closeFeatureDiscovery = this.closeFeatureDiscovery.bind(this)
  }

  async componentDidMount() {
    const { session, getProjects, getUserProjects } = this.props
    await getProjects(session.authToken)
    const { result: userProjects } = await getUserProjects(session.authToken)
    if (!userProjects.contributed.length && !userProjects.owned.length) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ open: true })
    }
  }

  viewProject(projectId) {
    this.props.history.push(`/projects/${projectId}/overview`)
  }

  newProject() {
    this.props.history.push('/projects/new')
  }

  closeFeatureDiscovery() {
    this.setState({ open: false })
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
      return null
    }
    return (
      <BasicSpinner />
    )
  }

  render() {
    return (
      <div>
        {
          this.renderProjects()
        }
        <FeatureDiscovery
          open={this.state.open}
          title="Create a new project"
          text="Click the button to create a new project and get started"
          onClose={this.closeFeatureDiscovery}
          backgroundColor={Theme.colors.primary}
        >
          <FloatingActionButton onClick={this.newProject} />
        </FeatureDiscovery>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  getUserProjects: PropTypes.func.isRequired
}

const ExportedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default withRouter(ExportedHome)
