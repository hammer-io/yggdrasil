/* eslint react/no-unused-state: 0 */
/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import { Paper, RaisedButton, FlatButton } from 'material-ui'

import Theme from '../../style/theme'
import ProjectCreationForm from '../components/project/creation/ProjectCreationForm'
import ProjectCreationOption1 from '../components/project/creation/ProjectCreationOption1'
import ProjectCreationOption2 from '../components/project/creation/ProjectCreationOption2'
import ProjectCreationOption3 from '../components/project/creation/ProjectCreationOption3'
import Dialog from '../components/misc/Dialog'
import { checkGithubToken, checkTravisToken, checkHerokuToken } from '../actions/session'
import { getTools } from '../actions/tools'
import { addProject, getProjectFiles } from '../actions/project'
import * as validator from '../utils/validator'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-evenly',
    marginLeft: '100px',
    marginRight: '100px',
    paddingTop: '50px'
  },
  stepWrapper: {
    height: '550px',
    backgroundColor: Theme.colors.white
  },
  stepHeader: {
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: Theme.colors.white
  },
  stepContent: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '50px'
  }
}

const mapStateToProps = state => ({
  session: state.session,
  tools: state.tools
})

const mapDispatchToProps = {
  checkGithubToken,
  checkTravisToken,
  checkHerokuToken,
  getTools,
  addProject,
  getProjectFiles
}

class NewProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stepIndex: 0,

      // Project Creation Form
      dropDownValue: 1,
      dropDownText: 'MIT',
      name: '',
      nameErrorText: '',
      description: '',
      descriptionErrorText: '',
      author: '',
      authorErrorText: '',
      version: '',
      versionErrorText: '',

      // Selected options
      githubSelected: false,
      noSourceSelected: false,
      travisSelected: false,
      noCISelected: false,
      dockerSelected: false,
      noContainerSelected: false,
      herokuSelected: false,
      noDeploySelected: false,
      mochaSelected: false,
      noTestSelected: false,
      expressSelected: false,
      noBackendSelected: false,
      sequelizeSelected: false,
      noORMSelected: false,

      // Disabled options
      githubDisabled: true,
      travisDisabled: true,
      dockerDisabled: true,
      herokuDisabled: true,

      isTravisAuthenticated: false,
      isHerokuAuthenticated: false,

      githubErrorText: '',
      travisErrorText: '',
      herokuErrorText: '',

      // back and next buttons
      backDisabled: true,

      // dialog
      dialogOpen: false,
      dialogErrorText: ''
    }

    this.handleDropDownChange = this.handleDropDownChange.bind(this)
    this.nameOnChange = this.nameOnChange.bind(this)
    this.descriptionOnChange = this.descriptionOnChange.bind(this)
    this.authorOnChange = this.authorOnChange.bind(this)
    this.versionOnChange = this.versionOnChange.bind(this)
    this.clickBack = this.clickBack.bind(this)
    this.clickNext = this.clickNext.bind(this)
    this.clickCreate = this.clickCreate.bind(this)
    this.clickGithub = this.clickGithub.bind(this)
    this.clickNoSource = this.clickNoSource.bind(this)
    this.clickTravis = this.clickTravis.bind(this)
    this.clickNoCI = this.clickNoCI.bind(this)
    this.clickDocker = this.clickDocker.bind(this)
    this.clickNoContainer = this.clickNoContainer.bind(this)
    this.clickHeroku = this.clickHeroku.bind(this)
    this.clickNoDeploy = this.clickNoDeploy.bind(this)
    this.clickMocha = this.clickMocha.bind(this)
    this.clickNoTest = this.clickNoTest.bind(this)
    this.clickExpress = this.clickExpress.bind(this)
    this.clickNoBackend = this.clickNoBackend.bind(this)
    this.clickSequelize = this.clickSequelize.bind(this)
    this.clickNoORM = this.clickNoORM.bind(this)
    this.dialogClose = this.dialogClose.bind(this)
  }

  async componentDidMount() {
    const {
      session,
      checkGithubToken,
      checkTravisToken,
      checkHerokuToken,
      getTools
    } = this.props
    const { result: { isGithubAuthenticated } } = await checkGithubToken(session.authToken)
    const { result: { isTravisAuthenticated } } = await checkTravisToken(session.authToken)
    const { result: { isHerokuAuthenticated } } = await checkHerokuToken(session.authToken)
    await getTools(session.authToken)

    this.setState({
      isGithubAuthenticated,
      isTravisAuthenticated,
      isHerokuAuthenticated
    })

    if (isGithubAuthenticated) {
      this.setState({
        githubDisabled: false
      })
    } else {
      this.setState({ githubErrorText: 'Github account not linked. Go to user settings to update.' })
    }

    if (!isTravisAuthenticated) {
      this.setState({ travisErrorText: 'Travis account not linked. Go to user settings to update.' })
    }

    if (!isHerokuAuthenticated) {
      this.setState({ herokuErrorText: 'Heroku account not linked. Go to user settings to update.' })
    }
  }

  getStepContent() {
    switch (this.state.stepIndex) {
      case 0:
        return (
          <ProjectCreationForm
            dropDownValue={this.state.dropDownValue}
            name={this.state.name}
            description={this.state.description}
            author={this.state.author}
            version={this.state.version}
            handleDropDownChange={this.handleDropDownChange}
            nameOnChange={this.nameOnChange}
            descriptionOnChange={this.descriptionOnChange}
            authorOnChange={this.authorOnChange}
            versionOnChange={this.versionOnChange}
            nameErrorText={this.state.nameErrorText}
            descriptionErrorText={this.state.descriptionErrorText}
            authorErrorText={this.state.authorErrorText}
            versionErrorText={this.state.versionErrorText}
          />
        )
      case 1:
        return (
          <ProjectCreationOption1
            githubSelected={this.state.githubSelected}
            travisSelected={this.state.travisSelected}
            noSourceSelected={this.state.noSourceSelected}
            noCISelected={this.state.noCISelected}
            clickGithub={this.clickGithub}
            clickTravis={this.clickTravis}
            clickNoSource={this.clickNoSource}
            clickNoCI={this.clickNoCI}
            githubDisabled={this.state.githubDisabled}
            travisDisabled={this.state.travisDisabled}
            githubErrorText={this.state.githubErrorText}
            travisErrorText={this.state.travisErrorText}
          />
        )
      case 2:
        return (
          <ProjectCreationOption2
            dockerSelected={this.state.dockerSelected}
            herokuSelected={this.state.herokuSelected}
            noContainerSelected={this.state.noContainerSelected}
            noDeploySelected={this.state.noDeploySelected}
            clickDocker={this.clickDocker}
            clickHeroku={this.clickHeroku}
            clickNoContainer={this.clickNoContainer}
            clickNoDeploy={this.clickNoDeploy}
            dockerDisabled={this.state.dockerDisabled}
            herokuDisabled={this.state.herokuDisabled}
            herokuErrorText={this.state.herokuErrorText}
          />
        )
      case 3:
        return (
          <ProjectCreationOption3
            expressSelected={this.state.expressSelected}
            mochaSelected={this.state.mochaSelected}
            sequelizeSelected={this.state.sequelizeSelected}
            noBackendSelected={this.state.noBackendSelected}
            noTestSelected={this.state.noTestSelected}
            noORMSelected={this.state.noORMSelected}
            clickMocha={this.clickMocha}
            clickExpress={this.clickExpress}
            clickSequelize={this.clickSequelize}
            clickNoBackend={this.clickNoBackend}
            clickNoTest={this.clickNoTest}
            clickNoORM={this.clickNoORM}
          />
        )
      default: return null
    }
  }

  async clickCreate() {
    const {
      tools,
      session,
      addProject,
      getProjectFiles,
      history
    } = this.props

    const {
      mochaSelected,
      noTestSelected,
      expressSelected,
      noBackendSelected,
      sequelizeSelected,
      noORMSelected
    } = this.state

    if (!expressSelected && !noBackendSelected) {
      this.setState({
        dialogErrorText: 'Please select a web framework',
        dialogOpen: true
      })
      return
    }

    if (!mochaSelected && !noTestSelected) {
      this.setState({
        dialogErrorText: 'Please select a testing framework',
        dialogOpen: true
      })
      return
    }

    if (!sequelizeSelected && !noORMSelected) {
      this.setState({
        dialogErrorText: 'Please select an ORM framework',
        dialogOpen: true
      })
      return
    }

    const sourceControlId = _.findKey(tools.all.byId, (tool => this.state.githubSelected && tool.name === 'GitHub'))
    const ciId = _.findKey(tools.all.byId, (tool => this.state.travisSelected && tool.name === 'TravisCI'))
    const containerId = _.findKey(tools.all.byId, (tool => this.state.dockerSelected && tool.name === 'Docker'))
    const deployId = _.findKey(tools.all.byId, (tool => this.state.herokuSelected && tool.name === 'Heroku'))
    const backendId = _.findKey(tools.all.byId, (tool => this.state.expressSelected && tool.name === 'ExpressJS'))
    const testId = _.findKey(tools.all.byId, (tool => this.state.mochaSelected && tool.name === 'Mocha'))
    const ormId = _.findKey(tools.all.byId, (tool => this.state.sequelizeSelected && tool.name === 'Sequelize'))
    const newProject = {
      projectName: this.state.name,
      description: this.state.description,
      license: this.state.dropDownText,
      author: this.state.author,
      version: this.state.version,
      sourceControl: sourceControlId,
      ci: ciId,
      containerization: containerId,
      deployment: deployId,
      web: backendId,
      test: testId,
      orm: ormId
    }

    const { result: project } = await addProject(session.authToken, newProject)
    await getProjectFiles(session.authToken, project.id)
    history.push(`/projects/${project.id}`)
  }

  clickNext() {
    switch (this.state.stepIndex) {
      case 0: {
        const {
          name,
          author,
          version
        } = this.state

        const validName = validator.validateProjectName(name)
        if (typeof validName === 'string') {
          this.setState({ nameErrorText: validName })
          return
        }

        const validAuthor = validator.validateAuthor(author)
        if (typeof validAuthor === 'string') {
          this.setState({ authorErrorText: validAuthor })
          return
        }

        const validVersion = validator.validateVersion(version)
        if (typeof validVersion === 'string') {
          this.setState({ versionErrorText: validVersion })
          return
        }

        this.setState({
          stepIndex: this.state.stepIndex + 1,
          backDisabled: false
        })
        break
      }
      case 1: {
        const {
          githubSelected,
          noSourceSelected,
          travisSelected,
          noCISelected
        } = this.state

        if (!githubSelected && !noSourceSelected) {
          this.setState({
            dialogErrorText: 'Please select a source control tool',
            dialogOpen: true
          })
          return
        }

        if (!travisSelected && !noCISelected) {
          this.setState({
            dialogErrorText: 'Please select a continuous integration tool',
            dialogOpen: true
          })
          return
        }

        this.setState({ stepIndex: this.state.stepIndex + 1 })
        break
      }
      case 2: {
        const {
          dockerSelected,
          noContainerSelected,
          herokuSelected,
          noDeploySelected
        } = this.state

        if (!dockerSelected && !noContainerSelected) {
          this.setState({
            dialogErrorText: 'Please select a containerization tool',
            dialogOpen: true
          })
          return
        }

        if (!herokuSelected && !noDeploySelected) {
          this.setState({
            dialogErrorText: 'Please select a deployment tool',
            dialogOpen: true
          })
          return
        }

        this.setState({ stepIndex: this.state.stepIndex + 1 })
        break
      }
      default:
        break
    }
  }

  clickBack() {
    if (this.state.stepIndex - 1 >= 0) {
      this.setState({ stepIndex: this.state.stepIndex - 1 }, () => {
        if (this.state.stepIndex === 0) {
          this.setState({ backDisabled: true })
        }
      })
    }
  }

  dialogClose() {
    this.setState({
      dialogOpen: false,
      dialogErrorText: ''
    })
  }

  nameOnChange(event, newValue) {
    this.setState({ name: newValue })
    this.setState({ nameErrorText: '' })
  }

  descriptionOnChange(event, newValue) {
    this.setState({ description: newValue })
    this.setState({ descriptionErrorText: '' })
  }

  authorOnChange(event, newValue) {
    this.setState({ author: newValue })
    this.setState({ authorErrorText: '' })
  }

  versionOnChange(event, newValue) {
    this.setState({ version: newValue })
    this.setState({ versionErrorText: '' })
  }

  handleDropDownChange(event, index, value) {
    this.setState({
      dropDownValue: value,
      dropDownText: value === 1 ? 'MIT' : 'ISC'
    })
  }

  clickGithub() {
    if (this.state.noSourceSelected) {
      this.setState({ noSourceSelected: false })
    }
    this.setState({ githubSelected: !this.state.githubSelected }, () => {
      if (!this.state.githubSelected) {
        this.setState({
          travisDisabled: true,
          dockerDisabled: true,
          herokuDisabled: true
        })
      } else if (this.state.isTravisAuthenticated) {
        this.setState({ travisDisabled: false })
        if (this.state.travisSelected) {
          this.setState({ dockerDisabled: false })
          if (this.state.dockerSelected) {
            this.setState({ herokuDisabled: false })
          }
        }
      }
    })
  }

  clickTravis() {
    if (this.state.noCISelected) {
      this.setState({ noCISelected: false })
    }
    this.setState({ travisSelected: !this.state.travisSelected }, () => {
      if (!this.state.travisSelected) {
        this.setState({
          dockerDisabled: true,
          herokuDisabled: true
        })
      } else {
        this.setState({ dockerDisabled: false })
        if (this.state.dockerSelected && this.state.isHerokuAuthenticated) {
          this.setState({ herokuDisabled: false })
        }
      }
    })
  }

  clickDocker() {
    if (this.state.noContainerSelected) {
      this.setState({ noContainerSelected: false })
    }
    this.setState({ dockerSelected: !this.state.dockerSelected }, () => {
      if (!this.state.dockerSelected || !this.state.isHerokuAuthenticated) {
        this.setState({ herokuDisabled: true })
      } else {
        this.setState({ herokuDisabled: false })
      }
    })
  }

  clickHeroku() {
    if (this.state.noDeploySelected) {
      this.setState({ noDeploySelected: false })
    }
    this.setState({ herokuSelected: !this.state.herokuSelected })
  }

  clickMocha() {
    if (this.state.noTestSelected) {
      this.setState({ noTestSelected: false })
    }
    this.setState({ mochaSelected: !this.state.mochaSelected })
  }

  clickExpress() {
    if (this.state.noBackendSelected) {
      this.setState({ noBackendSelected: false })
    }
    this.setState({ expressSelected: !this.state.expressSelected })
  }

  clickSequelize() {
    if (this.state.noORMSelected) {
      this.setState({ noORMSelected: false })
    }
    this.setState({ sequelizeSelected: !this.state.sequelizeSelected })
  }

  clickNoSource() {
    if (this.state.githubSelected) {
      this.setState({ githubSelected: false })
    }
    this.setState({ noSourceSelected: !this.state.noSourceSelected }, () => {
      if (this.state.noSourceSelected) {
        this.setState({
          travisDisabled: true,
          dockerDisabled: true,
          herokuDisabled: true
        })
      }
    })
  }

  clickNoCI() {
    if (this.state.travisSelected) {
      this.setState({ travisSelected: false })
    }
    this.setState({ noCISelected: !this.state.noCISelected }, () => {
      if (this.state.noCISelected) {
        this.setState({
          dockerDisabled: true,
          herokuDisabled: true
        })
      }
    })
  }

  clickNoContainer() {
    if (this.state.dockerSelected) {
      this.setState({ dockerSelected: false })
    }
    this.setState({ noContainerSelected: !this.state.noContainerSelected }, () => {
      if (this.state.noContainerSelected) {
        this.setState({ herokuDisabled: true })
      }
    })
  }

  clickNoDeploy() {
    if (this.state.herokuSelected) {
      this.setState({ herokuSelected: false })
    }
    this.setState({ noDeploySelected: !this.state.noDeploySelected })
  }

  clickNoTest() {
    if (this.state.mochaSelected) {
      this.setState({ mochaSelected: false })
    }
    this.setState({ noTestSelected: !this.state.noTestSelected })
  }

  clickNoBackend() {
    if (this.state.expressSelected) {
      this.setState({ expressSelected: false })
    }
    this.setState({ noBackendSelected: !this.state.noBackendSelected })
  }

  clickNoORM() {
    if (this.state.sequelizeSelected) {
      this.setState({ sequelizeSelected: false })
    }
    this.setState({ noORMSelected: !this.state.noORMSelected })
  }

  render() {
    return (
      <DocumentTitle title="New Project">
        <div style={styles.container}>
          <Paper zDepth={1} rounded={false} style={styles.stepWrapper}>
            <Paper zDepth={1} style={styles.stepHeader}>
              <Stepper activeStep={this.state.stepIndex}>
                <Step>
                  <StepLabel>Project information</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Source control and continuous integration</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Containerization and deployment</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Frameworks</StepLabel>
                </Step>
              </Stepper>
            </Paper>
            <div style={styles.stepContent}>
              {
                this.getStepContent()
              }
            </div>
            <div style={styles.buttonWrapper}>
              <FlatButton
                label="Back"
                style={{ margin: '5px' }}
                onClick={this.clickBack}
                disabled={this.state.backDisabled}
              />
              {
                this.state.stepIndex === 3 ?
                  <RaisedButton
                    label="Create"
                    primary
                    style={{ margin: '5px' }}
                    onClick={this.clickCreate}
                  /> :
                  <RaisedButton
                    label="Next"
                    primary
                    style={{ margin: '5px' }}
                    onClick={this.clickNext}
                  />
              }
            </div>
          </Paper>
          <Dialog
            onCancel={this.dialogClose}
            onContinue={this.dialogClose}
            open={this.state.dialogOpen}
            text={this.state.dialogErrorText}
          />
        </div>
      </DocumentTitle>
    )
  }
}

NewProject.propTypes = {
  session: PropTypes.object.isRequired,
  tools: PropTypes.object.isRequired,
  checkGithubToken: PropTypes.func.isRequired,
  checkTravisToken: PropTypes.func.isRequired,
  checkHerokuToken: PropTypes.func.isRequired,
  getTools: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  getProjectFiles: PropTypes.func.isRequired
}

const ExportedNewProject = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject)

export default withRouter(ExportedNewProject)
