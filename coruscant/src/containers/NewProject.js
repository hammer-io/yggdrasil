import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
import { Paper, RaisedButton, FlatButton } from 'material-ui'

import Theme from '../../style/theme'
import ProjectCreationForm from './../components/ProjectCreationForm'
import ProjectCreationOption1 from './../components/ProjectCreationOption1'
import ProjectCreationOption2 from './../components/ProjectCreationOption2'
import ProjectCreationOption3 from './../components/ProjectCreationOption3'
import { checkGithubToken, checkTravisToken, checkHerokuToken } from '../actions/session'

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
    height: '500px',
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
  session: state.session
})

const mapDispatchToProps = {
  checkGithubToken,
  checkTravisToken,
  checkHerokuToken
}

@connect(mapStateToProps, mapDispatchToProps)
class NewProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stepIndex: 0,

      // Project Creation Form
      dropDownValue: 1,
      name: '',
      nameErrorText: '',
      description: '',
      descriptionErrorText: '',
      author: '',
      authorErrorText: '',

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

      isGithubAuthenticated: false,
      isTravisAuthenticated: false,
      isHerokuAuthenticated: false,

      // back and next buttons
      backDisabled: true
    }

    this.handleDropDownChange = this.handleDropDownChange.bind(this)
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
  }

  async componentDidMount() {
    const {
      session,
      checkGithubToken,
      checkTravisToken,
      checkHerokuToken
    } = this.props
    const isGithubAuthenticated = await checkGithubToken(session.authToken)
    const isTravisAuthenticated = await checkTravisToken(session.authToken)
    const isHerokuAuthenticated = await checkHerokuToken(session.authToken)
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isGithubAuthenticated,
      isTravisAuthenticated,
      isHerokuAuthenticated
    })

    if (isGithubAuthenticated) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ githubDisabled: false })
    }
  }

  getStepContent() {
    switch (this.state.stepIndex) {
      case 0:
        return (
          <ProjectCreationForm
            dropDownValue={this.state.dropDownValue}
            handleDropDownChange={this.handleDropDownChange}
            nameOnChange={this.nameOnChange}
            descriptionOnChange={this.descriptionOnChange}
            authorOnChange={this.authorOnChange}
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
      default:
        return 'You\'re a long way from home sonny jim!'
    }
  }

  clickCreate() {
    // validate options
  }

  clickNext() {
    switch (this.state.stepIndex) {
      case 0:
        // validate fields
        this.setState({
          stepIndex: this.state.stepIndex + 1,
          backDisabled: false
        })
        break
      case 1:
        // validate options
        this.setState({ stepIndex: this.state.stepIndex + 1 })
        break
      case 2:
        // validate options
        this.setState({ stepIndex: this.state.stepIndex + 1 })
        break
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

  handleDropDownChange(event, index, value) {
    this.setState({ dropDownValue: value })
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
                  disabled={this.state.nextDisabled}
                />
            }
          </div>
        </Paper>
      </div>
    )
  }
}

NewProject.propTypes = {
  // projects: PropTypes.object.isRequired
}

export default withRouter(NewProject)
