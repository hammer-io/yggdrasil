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
import Spinner from './../components/Spinner'

const styles = {
  headingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Theme.padding.regular
  }
}

const readme = '[![Build Status](https://travis-ci.org/hammer-io/tyr.svg?branch=master)](https://travis-ci.org/hammer-io/tyr)\n' +
    '[![codecov](https://codecov.io/gh/hammer-io/tyr/branch/master/graph/badge.svg)](https://codecov.io/gh/hammer-io/tyr)\n' +
    '[![npm version](https://badge.fury.io/js/tyr-cli.svg)](https://badge.fury.io/js/tyr-cli)\n' +
    '\n' +
    '# tyr\n' +
    '\n' +
    'A CLI tool to scaffold Node.js microservice applications with DevOps capabilities. It\n' +
    'takes an opinionated approach, meaning we\'ve done the homework and start you off with\n' +
    'what we think are the best tools for a small team creating a new open-source project. Upon\n' +
    'running the CLI, it will ask you a series of questions and use the answers to do the\n' +
    'following:\n' +
    '\n' +
    '- generate a new Node.js project,\n' +
    '- add testing, web, and database frameworks,\n' +
    '- initialize and push the code to a new GitHub repository,\n' +
    '- establish a continuous integration environment,\n' +
    '- build a container for the code, and\n' +
    '- deploy the app container to a cloud service.\n' +
    '\n' +
    'The goal is to save you time and headaches and get you started developing code faster.\n' +
    '\n' +
    '\n' +
    '## Getting Started\n' +
    '\n' +
    '### Prerequisites\n' +
    '\n' +
    'Before you can use Tyr, you need to make sure you\'ve done the following:\n' +
    '\n' +
    '1. Create a [GitHub](https://github.com/) account. At this current stage of development,\n' +
    '   GitHub is the default version control platform for storing and managing your code.\n' +
    '2. Ensure that you linked your TravisCI account to your GitHub account.   \n' +
    '3. Create a [Heroku](https://signup.heroku.com/) account. At this current stage of development, Heroku is the default web hosting service. \n' +
    '4. After creating a Heroku account, find your API key [here](https://dashboard.heroku.com/account). Make sure to copy it as you\'ll need it to sign in to Heroku. \n' +
    '\n' +
    '### Installation\n' +
    '\n' +
    '```bash\n' +
    'npm install --global tyr-cli\n' +
    '```\n' +
    '\n' +
    '\n' +
    '## Usage\n' +
    '\n' +
    '```bash\n' +
    'tyr [OPTIONS]\n' +
    '```\n' +
    '\n' +
    '### Options:\n' +
    '* `-V, --version`    output the version number\n' +
    '* `--config <file>`  configure project from configuration file\n' +
    '* `--logfile <file>` the filepath that logs will be written to\n' +
    '* `-h, --help`       output usage information\n' +
    '\n' +
    '## Configuration File\n' +
    '### Project Configurations\n' +
    '| Name          | Required | Note                                                                           |\n' +
    '|---------------|----------|--------------------------------------------------------------------------------|\n' +
    '| `projectName` | Yes      | Must be a valid directory name and cannot be a directory that already exists.  |\n' +
    '| `description` | Yes      |                                                                                |\n' +
    '| `version`     | No       | Must match `(number)(.number)*`                                                |\n' +
    '| `author`      | No       | For multiple authors, use comma separated values                               |\n' +
    '| `license`     | No       |                                                                                |\n' +
    '\n' +
    '### Tooling Choices\n' +
    '| Name               | Required | Description                                    | Valid Choices         |\n' +
    '|--------------------|----------|------------------------------------------------|-----------------------|\n' +
    '| `ci`               | Yes      | The Continuous Integration Tool you want to use | `<None>`, `TravisCI`  |\n' +
    '| `containerization` | Yes      | The Containerization tool you want to use      | `<None>`, `Docker`    |\n' +
    '| `deployment`       | Yes      | The deployment tool you want to use            | `<None>`, `Heroku`    |\n' +
    '| `sourceControl`    | Yes      | The source control tool you want to use        | `<None>`, `GitHub`    |\n' +
    '| `web`              | Yes      | The web framework you want to use              | `<None>`, `ExpressJS` |\n' +
    '| `test`             | Yes      | The test framework you want to use             | `<None>`, `Mocha`      |\n' +
    '| `database`         | Yes      | The database framework you want to use         | `<None>`, `Sequelize` |\n' +
    '\n' +
    '\n' +
    '* If Source Control Choice is `<None>`, then CI Choice, Containerization Choice, and Deployment \n' +
    'Choice must also be `<None>`.\n' +
    '\n' +
    '* If CI Choice is `<None>`, then Containerization Choice and Deployment Choice must also be `<None>`.\n' +
    '\n' +
    '* If Containerization Choice is `<None>`, then Deployment Choice must also be none. \n' +
    '\n' +
    '### File Format\n' +
    '```javascript\n' +
    '{\n' +
    '  projectConfigurations:\n' +
    '    {\n' +
    '      projectName: \'{project name}\',\n' +
    '      description: \'{project description}\',\n' +
    '      version: \'{version number}\',\n' +
    '      author: [\'author1\', \'author2\', ...],\n' +
    '      license: \'{license}\'\n' +
    '    },\n' +
    '  toolingConfigurations:\n' +
    '    {\n' +
    '      sourceControl: \'{source control choice}\',\n' +
    '      ci: \'{ci choice}\',\n' +
    '      containerization: \'{containerization choice}\',\n' +
    '      deployment: \'{deployment choice}\',\n' +
    '      web: \'{web framework choice}\',\n' +
    '      test: \'{test framework choice}\',\n' +
    '      database: \'{database framework choice}\'\n' +
    '    }\n' +
    '}\n' +
    '```\n' +
    '\n' +
    '\n' +
    '## Contributing\n' +
    '\n' +
    'Please see our [Contributing Guide](https://github.com/hammer-io/tyr/blob/master/CONTRIBUTING.md)\n' +
    'for contribution guidelines.\n' +
    '\n' +
    '## Security Information Management Policy\n' +
    '\n' +
    'In order to orchestrate the various third party applications for your\n' +
    'project, we will periodically ask for your username and password to\n' +
    'these applications. To find out more about how we use these credentials\n' +
    'and what steps we are taking to keep your information safe, please read\n' +
    'the [Security Information Management Policy](https://github.com/hammer-io/tyr/blob/master/SECURITY_INFORMATION_MANAGEMENT_POLICY.md).'


const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects,
  projectMembers: state.projectMembers
})

const mapDispatchToProps = {
  getProject
}

@connect(mapStateToProps, mapDispatchToProps)
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
        <div style={Theme.spinnerContainer}>
          <Spinner />
        </div>
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
                <Flexbox>
                  <ProjectDescription content={readme} />
                </Flexbox>
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

export default ProjectOverview
