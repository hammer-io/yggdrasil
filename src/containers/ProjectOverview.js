import React from 'react'
import Flexbox from 'flexbox-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'material-ui/Tabs'
import _ from 'lodash'
import { getProject } from '../actions/project'
import ProjectHeader from '../components/ProjectHeader'
import ProjectDescription from '../components/ProjectDescription'
import ProjectIssues from './ProjectIssues'
import ProjectBuilds from './ProjectBuilds'
import ProjectLinks from '../components/ProjectLinks'
import ProjectContributors from './ProjectContributors'
import Theme from '../../style/theme'
import BasicSpinner from './../components/BasicSpinner'
import HeartbeatCount from '../components/statistics/HeartbeatCount'

const styles = {
  headingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Theme.padding.regular
  }
}

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects,
  projectMembers: state.projectMembers
})

const mapDispatchToProps = {
  getProject
}

class ProjectOverview extends React.Component {
  async componentDidMount() {
    const {
      session, getProject
    } = this.props
    const { match: { params } } = this.props
    await getProject(session.authToken, params.id)
  }

  render() {
    const projectList = _.values(this.props.projects.all.byId)
    let project
    if (projectList && projectList.length > 0) {
      [project] = projectList
    } else {
      return (
        <BasicSpinner />
      )
    }
    const { match: { params } } = this.props

    const projectDetails = {
      projectStatus: 'Healthy',
      ...project
    }
    return (
      <div style={styles.headingContainer}>
        <ProjectHeader {...projectDetails} />
        <Tabs style={{ width: '90%' }}>
          <Tab label="Overview" >
            <div>
              <Flexbox
                flexDirection="row"
                flexWrap="wrap"
                width="90%"
                justifyContent="space-around"
                alignItems="flex-start"
              >
                <Flexbox>
                  <HeartbeatCount projectId={params.id} />
                </Flexbox>
                <Flexbox>
                  <ProjectIssues
                    githubUrl={project.githubRepositoryName}
                    projectId={params.id}
                  />
                </Flexbox>
                <Flexbox>
                  <ProjectBuilds
                    travisUrl={project.travisRepositoryName}
                    projectId={params.id}
                  />
                </Flexbox>
                <Flexbox>
                  <ProjectLinks
                    travisUrl={project.travisRepositoryName}
                    githubUrl={project.githubRepositoryName}
                    herokuUrl={project.herokuApplicationName}
                  />
                </Flexbox>
              </Flexbox>
              <Flexbox
                flexDirection="row"
                justifyContent="center"
              >
                <ProjectDescription content={project.markdownDescription} />
              </Flexbox>
            </div>
          </Tab>
          <Tab label="Members" >
            <div>
              <ProjectContributors projectId={params.id} />
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

ProjectOverview.propTypes = {
  session: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const ExportedProjectOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectOverview)

export default ExportedProjectOverview
