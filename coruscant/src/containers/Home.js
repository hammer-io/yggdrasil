import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getProjects, getUserProjects } from '../actions/project'
import Theme from '../../style/theme'
import Spinner from './../components/Spinner'
import ProjectList from './../components/ProjectList'
import ProjectsNotFound from './../components/ProjectsNotFound'
import NewFloatingActionButton from '../components/NewFloatingActionButton'

const styles = {
  header: {
    fontFamily: Theme.font.family.regular
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: Theme.padding.regular
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Theme.padding.large
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

@connect(mapStateToProps, mapDispatchToProps)
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
      const userProjects = [...projects.owned, ...projects.contributed]
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
  }

  render() {
    return (
      <div>
        {
          this.renderProjects()
        }

        <NewFloatingActionButton onClick={this.newProject} />
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

export default withRouter(Home)