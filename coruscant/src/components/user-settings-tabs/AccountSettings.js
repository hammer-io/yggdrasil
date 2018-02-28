import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import { saveState } from '../../utils/localStorage'
import Theme from '../../../style/theme'
import BasicSpinner from '../../components/BasicSpinner'
import { checkGithubToken, deleteGithubToken, checkHerokuToken, deleteHerokuToken, setGithubState, setHerokuState } from '../../actions/session'

const styles = {
  container: {
    padding: Theme.padding.tiny
  }
}

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = {
  checkGithubToken,
  deleteGithubToken,
  checkHerokuToken,
  deleteHerokuToken,
  setGithubState,
  setHerokuState
}

@connect(mapStateToProps, mapDispatchToProps)
class AccountSettings extends Component {
  static getUnguessableString() {
    return Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15)
    // return '4'
  }

  constructor(props) {
    super(props)
    this.state = {
      github: 'spin',
      heroku: 'spin'
    }
  }

  componentDidMount() {
    this.checkGithub()
    this.checkHeroku()
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
      // TODO
      // This should actually set github to spin,
      // but the backend is throwing an error when there is no token.
      this.setState({ github: false })
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

  async redirectToGithub() {
    const state = AccountSettings.getUnguessableString()
    const {
      session
    } = this.props

    saveState({
      session,
      githubState: state
    })

    window.location = `${'https://github.com/login/oauth/authorize?' +
    'client_id=6b57706945fa18ee0397&' +
    'scope=repo&' +
    'state='}${state}`
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

    window.location = `${'https://id.heroku.com/oauth/authorize?' +
    'client_id=9a65de7d-f3d0-4457-9197-556e85d56bca&' +
    'response_type=code&' +
    'scope=write&' +
    'state='}${state}`
  }

  renderGithubInfo() {
    const gitHubLinked = this.state.github
    if (gitHubLinked === 'spin') {
      return <BasicSpinner />
    }
    if (gitHubLinked) {
      return (
        <div>
          <div style={{ marginBottom: 10 }}>
            Linked to account: <div style={{ fontWeight: 'bold', display: 'inline' }}>NathanDeGraafTest</div>
          </div>
          <RaisedButton
            label="Remove GitHub Access"
            secondary
            onClick={() => { this.removeGithub() }}
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
        />
      </div>
    )
  }

  renderHerokuInfo() {
    const herokuLinked = this.state.heroku
    if (herokuLinked === 'spin') {
      return <BasicSpinner />
    }
    if (herokuLinked) {
      return (
        <div>
          <div style={{ marginBottom: 10 }}>
            Linked to account: <div style={{ fontWeight: 'bold', display: 'inline' }}>NathanDeGraafTest</div>
          </div>
          <RaisedButton
            label="Remove Heroku Access"
            secondary
            onClick={() => { this.removeHeroku() }}
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
        <h3>Heroku</h3>
        {this.renderHerokuInfo()}
      </div>
    )
  }
}

AccountSettings.propTypes = {
}


export default AccountSettings
