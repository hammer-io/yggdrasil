/* eslint-disable prefer-destructuring,no-param-reassign,react/sort-comp */
import Flexbox from 'flexbox-react'
import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText, FlatButton } from 'material-ui'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { saveState } from '../../utils/localStorage'
import Theme from '../../../style/theme'
import BasicSpinner from '../misc/BasicSpinner'
import { getSession, checkGithubToken, checkTravisToken, addTravisToken, deleteTravisToken, deleteGithubToken, checkHerokuToken, deleteHerokuToken } from '../../actions/session'
import GithubLogo from '../svg/flat-colorizable/GithubLogo'
import HerokuLogo from '../svg/flat-colorizable/HerokuLogo'
import TravisLogo from '../svg/TravisLogo'
import config from '../../utils/config'

const styles = {
  card: {
    width: '100%',
    margin: Theme.padding.tiny
  },
  container: {
    padding: Theme.padding.tiny
  },
  anchor: {
    color: Theme.palette.primary1Color
  },
  accountContent: {
    maxWidth: 400
  }
}

// To add any additional accounts, make sure to add the appropriate
// information here and in the constructor state and actions variables.
const accounts = [
  {
    title: 'GitHub',
    identifier: 'github',
    sessionUsername: 'githubUsername',
    url: 'https://github.com',
    avatar: <GithubLogo height="32px" width="32px" />,
    content: null
  },
  {
    title: 'Travis CI',
    identifier: 'travis',
    sessionUsername: 'githubUsername',
    url: 'https://travis-ci.org',
    avatar: <TravisLogo style={{ fontSize: 24 }} height="32px" width="32px" />,
    content: null,
    customInfo: 'A GitHub account must be linked before a Travis account can be linked.'
  },
  {
    title: 'Heroku',
    identifier: 'heroku',
    sessionUsername: 'herokuEmail',
    url: 'https://heroku.com/',
    avatar: <HerokuLogo height="32px" width="32px" />,
    content: null
  }
]

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

  static renderCard(data) {
    const key = `linked-account-${data.identifier}`
    return (
      <Flexbox key={key} flex="1">
        <Card style={styles.card}>
          <CardHeader
            title={data.title}
            subtitle={<a style={styles.anchor} href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a>}
            avatar={data.avatar}
          />
          {data.content}
        </Card>
      </Flexbox>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      github: 'spin',
      travis: 'spin',
      heroku: 'spin'
    }
    this.redirectToGithub = this.redirectToGithub.bind(this)
    this.addTravis = this.addTravis.bind(this)
    this.redirectToHeroku = this.redirectToHeroku.bind(this)
    this.removeGithub = this.removeGithub.bind(this)
    this.removeTravis = this.removeTravis.bind(this)
    this.removeHeroku = this.removeHeroku.bind(this)

    // These actions are called dynamically during account card rendering
    this.actions = {
      add: {
        github: this.redirectToGithub,
        travis: this.addTravis,
        heroku: this.redirectToHeroku
      },
      remove: {
        github: this.removeGithub,
        travis: this.removeTravis,
        heroku: this.removeHeroku
      }
    }
  }

  componentDidMount() {
    const {
      getSession,
      session
    } = this.props
    getSession(session.authToken)
    Promise.all([
      this.checkGithub(),
      this.checkHeroku(),
      this.checkTravis()
    ]).catch(console.error)
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

  setAccountContent(account) {
    const isAccountLinked = this.state[account.identifier]
    const userAccountName = this.props.session.user[account.sessionUsername]
    const onConnect = this.actions.add[account.identifier]
    const onRemove = this.actions.remove[account.identifier]

    if (isAccountLinked === 'spin') {
      account.content = <BasicSpinner />
      return
    }
    if (isAccountLinked) {
      account.content = (
        <div>
          <CardText>Linked to account: <b>{userAccountName}</b></CardText>
          <CardActions>
            <FlatButton label="Disconnect" secondary onClick={onRemove} />
          </CardActions>
        </div>
      )
      return
    }
    let info = `No account linked. Click the "Connect" button below to link your ${account.title} account to HammerIO. `
    if (account.customInfo) {
      info += account.customInfo
    }
    account.content = (
      <div>
        <CardText>{info}</CardText>
        <CardActions>
          <FlatButton label="Connect" primary onClick={onConnect} />
        </CardActions>
      </div>
    )
  }

  render() {
    // Generate the content to be rendered for each account card
    accounts.forEach(this.setAccountContent, this)

    return (
      <div style={styles.container}>
        <h2>Linked Accounts</h2>
        <Flexbox flexWrap="wrap">
          {accounts.map(AccountSettings.renderCard)}
        </Flexbox>
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
