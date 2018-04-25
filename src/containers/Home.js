import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import { getProjects, getUserProjects } from '../actions/project'
import { setPreviousRoute } from '../actions/session'
import Theme from '../../style/theme'
import BasicSpinner from '../components/misc/BasicSpinner'
import ProjectList from '../components/home/ProjectList'
import FloatingActionButton from '../components/misc/FloatingActionButton'
import FeatureDiscovery from '../components/home/feature-discovery'
import WrenchIcon from './../assets/icons/wrench.png'
import LaptopIcon from './../assets/icons/laptop.png'
import StartupIcon from './../assets/icons/startup.png'

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
  getUserProjects,
  setPreviousRoute
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      carousel: false
    }

    this.viewProject = this.viewProject.bind(this)
    this.newProject = this.newProject.bind(this)
    this.closeFeatureDiscovery = this.closeFeatureDiscovery.bind(this)
    this.closeCarousel = this.closeCarousel.bind(this)
  }

  async componentDidMount() {
    const {
      session,
      getProjects,
      getUserProjects,
      setPreviousRoute
    } = this.props
    await getProjects(session.authToken)
    const { result: userProjects } = await getUserProjects(session.authToken)

    // Could probably be done before fetching user projects
    // Assuming that if users come in from the register page
    // they have no projects for sure
    if (session.previousRoute === '/register') {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ carousel: true })
      setPreviousRoute('/home')
      return
    }

    if (!userProjects.contributed.length && !userProjects.owned.length) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ open: true })
    }
    setPreviousRoute('/home')
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

  closeCarousel() {
    this.setState({
      carousel: false,
      open: true
    })
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
        <AutoRotatingCarousel
          label="Get started"
          open={this.state.carousel}
          style={{ position: 'absolute' }}
          onStart={this.closeCarousel}
        >
          <Slide
            media={<img src={WrenchIcon} alt="build" />}
            mediaBackgroundStyle={{ backgroundColor: Theme.colors.accent_u2 }}
            contentStyle={{ backgroundColor: Theme.colors.accent }}
            title="Build"
            subtitle="Build microservice applications with ease"
          />
          <Slide
            media={<img src={StartupIcon} alt="deploy" />}
            mediaBackgroundStyle={{ backgroundColor: Theme.colors.cyan600 }}
            contentStyle={{ backgroundColor: Theme.colors.cyan300 }}
            title="Deploy"
            subtitle="Deploy applications to the cloud instantly"
          />
          <Slide
            media={<img src={LaptopIcon} alt="monitor" />}
            mediaBackgroundStyle={{ backgroundColor: Theme.colors.primary_u2 }}
            contentStyle={{ backgroundColor: Theme.colors.primary }}
            title="Monitor"
            subtitle="Efficiently monitor and maintain deployed services"
          />
        </AutoRotatingCarousel>
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
