import React from 'react'
import PropTypes from 'prop-types'
import ProjectItem from './ProjectItem'

const ProjectList = ({ projects, viewProject }) => (
  projects.map(project =>
    (
      <ProjectItem
        key={project.id}
        projectId={project.id}
        title={project.projectName}
        description={project.description}
        viewProject={viewProject}
      />
    ))
)

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired
}

export default ProjectList
