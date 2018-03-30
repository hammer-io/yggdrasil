/* eslint-disable prefer-destructuring */
import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { saveState } from '../../utils/localStorage'
import Theme from '../../../style/theme'
import BasicSpinner from '../misc/BasicSpinner'
import { getSession, checkGithubToken, checkTravisToken, addTravisToken, deleteTravisToken, deleteGithubToken, checkHerokuToken, deleteHerokuToken } from '../../actions/session'
import { externals } from '../../../webpack.config'
import GithubLogo from '../svg/flat-colorizable/GithubLogo'
import HerokuFilledLogo from '../svg/flat-colorizable/HerokuFilledLogo'
import TravisFilledLogo from '../svg/flat-colorizable/TravisFilledLogo'

const config = externals.config

const styles = {
  container: {
    padding: Theme.padding.tiny
  },
  icon: {
    fill: Theme.colors.white,
    fontSize: 24
  }
}

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = {
  checkGithubToken,
  checkHerokuToken,
  checkTravisToken,
  deleteGithubToken,
  deleteHerokuToken,
  deleteTravisToken,
  addTravisToken,
  getSession
}

class AccountSettings extends Component {
  static getUnguessableString() {
    return Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15)
  }

  constructor(props) {
    super(props)
    this.state = {
      github: 'spin',
      travis: 'spin',
      heroku: 'spin'
    }
  }

  componentDidMount() {
    const {
      getSession,
      session
    } = this.props
    getSession(session.authToken)
    this.checkGithub()
    this.checkHeroku()
    this.checkTravis()
  }

  async checkGithub() {
    const {
      checkGithubToken,
      session
    } = this.props
    const { result } = await checkGithubToken(session.authToken)
    if (result) {
      this.setState({ github: result.isGithubAuthenticated })
    } else {
      this.setState({ github: 'spin' })
    }
  }

  async checkTravis() {
    const {
      checkTravisToken,
      session
    } = this.props
    const { result } = await checkTravisToken(session.authToken)
    if (result) {
      this.setState({ travis: result.isTravisAuthenticated })
    } else {
      this.setState({ travis: 'spin' })
    }
  }

  async checkHeroku() {
    const {
      checkHerokuToken,
      session
    } = this.props
    const { result } = await checkHerokuToken(session.authToken)
    if (result) {
      this.setState({ heroku: result.isHerokuAuthenticated })
    } else {
      this.setState({ heroku: 'spin' })
    }
  }

  async removeGithub() {
    const {
      deleteGithubToken,
      session
    } = this.props
    const { error } = await deleteGithubToken(session.authToken)
    if (!error) {
      this.setState({ github: false })
    }
  }

  async removeHeroku() {
    const {
      deleteHerokuToken,
      session
    } = this.props
    const { error } = await deleteHerokuToken(session.authToken)
    if (!error) {
      this.setState({ heroku: false })
    }
  }

  async removeTravis() {
    const {
      deleteTravisToken,
      session
    } = this.props
    const { error } = await deleteTravisToken(session.authToken)
    if (!error) {
      this.setState({ travis: false })
    }
  }

  async addTravis() {
    const {
      addTravisToken,
      session
    } = this.props
    const { error } = await addTravisToken(session.authToken)
    if (!error) {
      this.setState({ travis: true })
    }
  }

  async redirectToGithub() {
    const state = AccountSettings.getUnguessableString()
    const {
      session
    } = this.props

    saveState({
      session,
      githubState: state
    })

    window.location = 'https://github.com/login/oauth/authorize?' +
      `client_id=${config.github.clientId}&` +
      'scope=repo&' +
      `state=${state}`
  }

  async redirectToHeroku() {
    const state = AccountSettings.getUnguessableString()
    const {
      session
    } = this.props

    saveState({
      session,
      herokuState: state
    })

    window.location = 'https://id.heroku.com/oauth/authorize?' +
      `client_id=${config.heroku.clientId}&` +
      'response_type=code&' +
      'scope=write&' +
      `state=${state}`
  }

  renderGithubInfo() {
    const gitHubLinked = this.state.github
    const { session } = this.props

    if (gitHubLinked === 'spin') {
      return <BasicSpinner />
    }
    if (gitHubLinked) {
      return (
        <div>
          <p>
            Linked to account: <b>{session.user.githubUsername}</b>
          </p>
          <RaisedButton
            label="Remove GitHub Access"
            secondary
            onClick={() => { this.removeGithub() }}
            icon={<GithubLogo style={styles.icon} height="24px" width="24px" />}
          />
        </div>
      )
    }
    return (
      <div>
        <p>
          No account linked. Click the &quot;Connect&quot; button
          below to link your GitHub account to Yggdrasil.
        </p>
        <RaisedButton
          label="Connect to GitHub"
          primary
          onClick={(() => { this.redirectToGithub() })}
          icon={<GithubLogo style={styles.icon} height="24px" width="24px" />}
        />
      </div>
    )
  }

  renderHerokuInfo() {
    const herokuLinked = this.state.heroku
    const { session } = this.props
    if (herokuLinked === 'spin') {
      return <BasicSpinner />
    }
    if (herokuLinked) {
      return (
        <div>
          <p>
            Linked to account: <b>{session.user.herokuEmail}</b>
          </p>
          <RaisedButton
            label="Remove Heroku Access"
            secondary
            onClick={() => { this.removeHeroku() }}
            icon={<HerokuFilledLogo style={styles.icon} fill={Theme.colors.white} height="24px" width="24px" />}
          />
        </div>
      )
    }
    return (
      <div>
        <p>
          No account linked. Click the &quot;Connect&quot; button
          below to link your Heroku account to Yggdrasil.
        </p>
        <RaisedButton
          label="Connect to Heroku"
          primary
          onClick={(() => { this.redirectToHeroku() })}
          icon={<HerokuFilledLogo style={styles.icon} fill={Theme.colors.white} height="24px" width="24px" />}
        />
      </div>
    )
  }

  renderTravisInfo() {
    const travisLinked = this.state.travis
    const { session } = this.props
    if (travisLinked === 'spin') {
      return <BasicSpinner />
    }
    if (travisLinked) {
      return (
        <div>
          <p>
            Linked to account: <b>{session.user.githubUsername}</b>
          </p>
          <RaisedButton
            label="Remove Travis Access"
            secondary
            onClick={() => { this.removeTravis() }}
            icon={<TravisFilledLogo style={styles.icon} height="24px" width="24px" />}
          />
        </div>
      )
    }
    return (
      <div>
        <p>
          No account linked. Click the &quot;Connect&quot; button
          below to automatically link the Travis account associated
          with your GitHub account to Yggdrasil. A GitHub account
          must be linked before a Travis account can be linked.
        </p>
        <RaisedButton
          label="Connect to Travis"
          primary
          disabled={this.state.github !== true}
          onClick={(() => { this.addTravis() })}
          icon={<TravisFilledLogo style={styles.icon} height="24px" width="24px" />}
        />
      </div>
    )
  }

  render() {
    return (
      <div style={styles.container}>
        <h2>Linked Accounts</h2>
        <h3>GitHub</h3>
        {this.renderGithubInfo()}
        <h3>Travis</h3>
        {this.renderTravisInfo()}
        <h3>Heroku</h3>
        {this.renderHerokuInfo()}
      </div>
    )
  }
}

AccountSettings.propTypes = {
  session: PropTypes.object.isRequired,
  getSession: PropTypes.func.isRequired
}

const ExportedAccountSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettings)

export default ExportedAccountSettings
