import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { getProjects, getUserProjects } from '../actions/project'
import Theme from '../../style/theme'
import BasicSpinner from './../components/BasicSpinner'
import ProjectList from './../components/ProjectList'
import ProjectsNotFound from './../components/ProjectsNotFound'
import FloatingActionButton from '../components/FloatingActionButton'

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

    this.viewProject = this.viewProject.bind(this)
    this.newProject = this.newProject.bind(this)
  }

  async componentDidMount() {
    const { session, getProjects, getUserProjects } = this.props
    await getProjects(session.authToken)
    await getUserProjects(session.authToken)
  }

  viewProject(projectId) {
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
      <BasicSpinner />
    )
  }

  render() {
    return (
      <div>
        {
          this.renderProjects()
        }
        <FloatingActionButton onClick={this.newProject} />
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
