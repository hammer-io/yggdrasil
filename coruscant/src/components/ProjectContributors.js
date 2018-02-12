import React, { Component } from 'react'
import { Paper } from 'material-ui'
import { List, ListItem } from 'material-ui/List'
import Flexbox from 'flexbox-react'
import Subheader from 'material-ui/Subheader'
import _ from 'lodash'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { connect } from 'react-redux'
import { getProject, getProjectContributors, getProjectOwners, addContributor, getUser, removeContributor, addOwner, removeOwner } from '../actions/project'

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

@connect(mapStateToProps, mapDispatchToProps)
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
    if (result !== null) {
      return result.id
    }
    console.log('Could not find specified user')
    return -1
  }

  async addMemberByName(user, owner) {
    const userId = await this.getUser(user)
    if (userId === -1) {
      // TODO show errors to user
      return
    }
    await this.addMember(userId, owner)
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
      await getProjectOwners(this.props.session.authToken, this.props.projectId)
    } else {
      const { removeContributor } = this.props
      await removeContributor(this.props.session.authToken, ids)
      await getProjectContributors(this.props.session.authToken, this.props.projectId)
    }
  }

  removeOwner(id) {
    console.log(`removing owner ${id}`)
    this.removeMember(id, true)
  }

  removeContributor(id) {
    console.log(`removing contributor ${id}`)
    this.removeMember(id, false)
  }

  makeOwner(id) {
    console.log(`making owner ${id}`)
    this.addMember(id, true)
  }

  async submitForm() {
    const { username, makeOwner } = this.state
    this.addMemberByName(username, makeOwner)
    this.setState({ username: '', makeOwner: false })
  }

  usernameOnChange(event, newValue) {
    this.setState({ username: newValue })
  }

  makeOwnerOnChange(event, newValue) {
    this.setState({ makeOwner: newValue })
  }

  renderMembers(members, isAnOwner) {
    return members.map(member => this.renderMember(member, isAnOwner))
  }

  renderMember(info, isAnOwner) {
    let name
    if (info.firstName === null || info.astName === null) {
      name = info.email
    } else {
      name = `${info.firstName} ${info.lastName}`
    }
    return (
      <ListItem
        primaryText={name}
        secondaryText={info.email}
        rightIconButton={this.renderRightIconMenu(isAnOwner, info.id)}
      />
    )
  }

  renderRightIconMenu(isAnOwner, id) {
    let isOwner = false
    if (this.props.projectMembers.fetchedOwners
      && this.props.projectMembers.owners.alIds[this.props.session.user.id] !== null) {
      isOwner = true
    }

    if (!isOwner) {
      return
    }
    if (isAnOwner) {
      return (
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={() => this.removeOwner(id)}>Remove</MenuItem>
        </IconMenu>
      )
    }
    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={() => this.makeOwner(id)}>Make Owner</MenuItem>
        <MenuItem onClick={() => this.removeContributor(id)}>Remove</MenuItem>
      </IconMenu>
    )
  }

  render() {
    const owners = _.values(this.props.projectMembers.owners.byId)
    const contributors = _.values(this.props.projectMembers.contributors.byId)
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={{ fontWeight: 'bold' }}>
            Current Contributors
          </div>
          <Divider />
          <List>
            <Subheader inset>Owners</Subheader>
            {this.renderMembers(owners, true)}
            <Subheader inset>Contributors</Subheader>
            {this.renderMembers(contributors, false)}
          </List>
        </Paper>
        <Paper style={Theme.projectDetails.header}>
          <div style={{ fontWeight: 'bold' }}>
            Invite new Contributor
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
              <RaisedButton label="Invite" primary onClick={this.submitForm} />
            </Flexbox>
          </Flexbox>
        </Paper>
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


export default ProjectContributors
