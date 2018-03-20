import React, { Component } from 'react'
import { Paper } from 'material-ui'
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
import { getProject, getProjectContributors, getProjectOwners, addContributor, removeContributor, addOwner, removeOwner } from '../actions/project'
import { getUser } from '../actions/user'
import Theme from '../../style/theme'

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

class ProjectContributors extends Component {
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
    if (info.firstName === null || info.astName === null) {
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
      return (
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={() => this.removeMember(id, true)}>Remove</MenuItem>
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
      <Paper style={Theme.projectDetails.header}>
        <div style={{ fontWeight: 'bold' }}>
          Add New Member
        </div>
        <Flexbox
          flexDirection="row"
          flexWrap="wrap"
          width="100%"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Flexbox
            flexGrow={1}
          >
            <TextField
              hintText="Username"
              value={this.state.username}
              onChange={this.usernameOnChange}
            />
          </Flexbox>
          <Flexbox
            flexGrow={1}
          >
            <Checkbox
              label="Make Owner"
              checked={this.state.makeOwner}
              onCheck={this.makeOwnerOnChange}
            />
          </Flexbox>
          <Flexbox
            flexGrow={1}
          >
            <RaisedButton label="Add Member" primary onClick={this.submitForm} />
          </Flexbox>
        </Flexbox>
      </Paper>
    )
  }

  render() {
    const owners = _.values(this.props.projectMembers.owners.byId)
    const contributors = _.values(this.props.projectMembers.contributors.byId)
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={{ fontWeight: 'bold' }}>
            Owners
          </div>
          <List>
            {this.renderMembers(owners, true)}
          </List>
        </Paper>
        <Paper style={Theme.projectDetails.header}>
          <div style={{ fontWeight: 'bold' }}>
            Contributors
          </div>
          <List>
            {this.renderMembers(contributors, false)}
          </List>
        </Paper>
        {this.renderAddMember()}
      </div>
    )
  }
}

ProjectContributors.propTypes = {
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

const ExportedProjectContributors = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContributors)

export default ExportedProjectContributors
