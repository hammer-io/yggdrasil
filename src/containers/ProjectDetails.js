import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Tabs, Tab } from 'material-ui/Tabs'
import _ from 'lodash'
import { getProject } from '../actions/project'
import BreadcrumbNav from '../components/BreadcrumbNav'
import ProjectHeader from '../components/project/ProjectHeader'
import MembersTab from '../components/project/MembersTab'
import MonitoringTab from '../components/project/MonitoringTab'
import BasicSpinner from './../components/BasicSpinner'
import OverviewTab from '../components/project/OverviewTab'
import PageWrap from '../components/PageWrap'

const tabValues = ['overview', 'monitoring', 'members']

function getBreadcrumbData(project) {
  return {
    items: [
      { location: '/home', text: 'Projects' },
      { location: `/projects/${project.id}`, text: project.projectName }
    ],
    prefix: `${project.projectName}-breadcrumb`
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

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabValue: props.match.params.tabValue
    }
  }

  async componentDidMount() {
    const { session, getProject, match: { params } } = this.props

    // Catch any bad paths in the settings subdirectory
    const currentTabValue = params.tabValue
    if (!tabValues.includes(currentTabValue)) {
      const replacementUrl = `/projects/${params.id}/overview`
      console.error(`There is no project page for '${currentTabValue}'! Redirecting to '${replacementUrl}'`)
      this.state.tabValue = 'overview'
      this.props.history.replace(replacementUrl)
    }

    // TODO: Remove await???
    await getProject(session.authToken, params.id)
  }

  handleTabChange = (tabValue) => {
    this.setState({
      tabValue
    })
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

    const url = {
      overview: `/projects/${project.id}/overview`,
      monitoring: `/projects/${project.id}/monitoring`,
      members: `/projects/${project.id}/members`
    }
    const projectDetails = {
      projectStatus: 'Healthy',
      ...project
    }
    const breadcrumb = getBreadcrumbData(project)
    return (
      <PageWrap title={project.projectName}>
        <BreadcrumbNav items={breadcrumb.items} keyPrefix={breadcrumb.prefix} />
        <ProjectHeader {...projectDetails} />
        <Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
          <Tab label="Overview" value="overview" containerElement={<Link to={url.overview} />}>
            <OverviewTab project={project} />
          </Tab>
          <Tab label="Monitoring" value="monitoring" containerElement={<Link to={url.monitoring} />}>
            <MonitoringTab projectId={params.id} />
          </Tab>
          <Tab label="Members" value="members" containerElement={<Link to={url.members} />}>
            <MembersTab projectId={params.id} />
          </Tab>
        </Tabs>
      </PageWrap>
    )
  }
}

ProjectDetails.propTypes = {
  history: PropTypes.any.isRequired,
  session: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const ExportedProjectDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails)

export default withRouter(ExportedProjectDetails)
