import React, { Component } from 'react'
import { Card, CardText, CardTitle } from 'material-ui'
import { List, ListItem } from 'material-ui/List'
import Flexbox from 'flexbox-react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { connect } from 'react-redux'
import { getProject, getProjectContributors, getProjectOwners, addContributor, removeContributor, addOwner, removeOwner } from '../../actions/project'
import { getUser } from '../../actions/user'
import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  },
  card: {
    width: '100%',
    margin: Theme.padding.tiny
  },
  addMemberButton: {
    width: '100%'
  }
}

const iconButtonElement = (
  <IconButton touch>
    <MoreVertIcon />
  </IconButton>
)

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects,
  projectMembers: state.projectMembers
})

const mapDispatchToProps = {
  getProject,
  getProjectContributors,
  getProjectOwners,
  addContributor,
  getUser,
  removeContributor,
  addOwner,
  removeOwner
}

class MembersTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      makeOwner: false
    }

    this.submitForm = this.submitForm.bind(this)
    this.usernameOnChange = this.usernameOnChange.bind(this)
    this.makeOwnerOnChange = this.makeOwnerOnChange.bind(this)
  }

  async componentDidMount() {
    const {
      session, getProject, getProjectOwners, getProjectContributors
    } = this.props
    const id = this.props.projectId
    await getProject(session.authToken, id)
    await getProjectOwners(session.authToken, id)
    await getProjectContributors(session.authToken, id)
  }

  async getUser(username) {
    const { getUser } = this.props
    const { result } = await getUser(this.props.session.authToken, username)
    return result
  }

  async addMemberByName(username, owner) {
    const user = await this.getUser(username)
    if (user === null) {
      // TODO let the user know what happened
      return
    }
    await this.addMember(user.id, owner)
  }

  async addMember(id, owner) {
    const ids = {
      projectId: this.props.projectId,
      userId: id
    }

    if (owner) {
      const { addOwner } = this.props
      await addOwner(this.props.session.authToken, ids)
    } else {
      const { addContributor } = this.props
      await addContributor(this.props.session.authToken, ids)
    }
  }

  async removeMember(id, owner) {
    const ids = {
      projectId: this.props.projectId,
      user: id
    }

    if (owner) {
      const { removeOwner } = this.props
      await removeOwner(this.props.session.authToken, ids)
    } else {
      const { removeContributor } = this.props
      await removeContributor(this.props.session.authToken, ids)
    }
  }

  async submitForm() {
    const { username, makeOwner } = this.state
    this.addMemberByName(username, makeOwner)
    this.setState({ username: '', makeOwner: false })
  }

  showOwnerSettings() {
    let isOwner = false
    // TODO
    // There's an endpoint for Check if a user is an owner
    // If this ever gives a bug use that instead
    if (this.props.projectMembers.fetchedOwners
      && (typeof this.props.projectMembers.owners.byId[this.props.session.user.id] !== 'undefined')) {
      isOwner = true
    }
    return isOwner
  }

  usernameOnChange(event, newValue) {
    this.setState({ username: newValue })
  }

  makeOwnerOnChange(event, newValue) {
    this.setState({ makeOwner: newValue })
  }

  renderMembers(members, owner) {
    return members.map(member => this.renderMember(member, owner))
  }

  renderMember(info, owner) {
    let name
    if (info.firstName === null || info.lastName === null) {
      name = info.email
    } else {
      name = `${info.firstName} ${info.lastName}`
    }
    const projectId = (owner) ? info.projectOwner.projectId : info.projectContributor.projectId
    const role = (owner) ? 'owner' : 'contributor'
    const key = `project.${projectId}.${role}.${info.id}`
    return (
      <ListItem
        key={key}
        primaryText={name}
        secondaryText={info.email}
        rightIconButton={this.renderRightIconMenu(owner, info.id)}
      />
    )
  }

  renderRightIconMenu(owner, id) {
    if (!this.showOwnerSettings()) {
      return
    }
    if (owner) {
      const isLastOwner = _.values(this.props.projectMembers.owners.byId).length <= 1


      return (
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem
            disabled={isLastOwner}
            onClick={() => this.removeMember(id, true)}
          >
              Remove
          </MenuItem>
        </IconMenu>
      )
    }
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => this.addMember(id, true)}>Make Owner</MenuItem>
        <MenuItem onClick={() => this.removeMember(id, false)}>Remove</MenuItem>
      </IconMenu>
    )
  }

  renderAddMember() {
    if (!this.showOwnerSettings()) {
      return
    }
    return (
      <Card style={styles.card}>
        <CardTitle title="Add New Member" />
        <CardText>
          <Flexbox flexWrap="wrap" justifyContent="flex-start" alignItems="center">
            <Flexbox flex="1">
              <TextField
                hintText="Username"
                value={this.state.username}
                onChange={this.usernameOnChange}
              />
            </Flexbox>
            <Flexbox flex="1">
              <Checkbox
                label="Make Owner"
                checked={this.state.makeOwner}
                onCheck={this.makeOwnerOnChange}
              />
            </Flexbox>
            <Flexbox flex="1">
              <RaisedButton label="Add Member" primary onClick={this.submitForm} style={styles.addMemberButton} />
            </Flexbox>
          </Flexbox>
        </CardText>
      </Card>
    )
  }

  render() {
    const owners = _.values(this.props.projectMembers.owners.byId)
    const contributors = _.values(this.props.projectMembers.contributors.byId)
    return (
      <div style={styles.container}>
        <Flexbox flexWrap="wrap">
          <Flexbox flex="1">
            <Card style={styles.card}>
              <CardTitle title="Owners" />
              <CardText>
                <List>
                  {this.renderMembers(owners, true)}
                </List>
              </CardText>
            </Card>
          </Flexbox>
          <Flexbox flex="1">
            <Card style={styles.card}>
              <CardTitle title="Contributors" />
              <CardText>
                <List>
                  {this.renderMembers(contributors, false)}
                </List>
              </CardText>
            </Card>
          </Flexbox>
          <Flexbox flex="1">
            {this.renderAddMember()}
          </Flexbox>
        </Flexbox>
      </div>
    )
  }
}

MembersTab.propTypes = {
  session: PropTypes.object.isRequired,
  projectMembers: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  getProjectContributors: PropTypes.func.isRequired,
  getProjectOwners: PropTypes.func.isRequired,
  addContributor: PropTypes.func.isRequired,
  addOwner: PropTypes.func.isRequired,
  removeContributor: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
}

const ExportedMembersTab = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersTab)

export default ExportedMembersTab
