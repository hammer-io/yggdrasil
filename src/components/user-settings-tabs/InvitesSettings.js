import _ from 'lodash'
import React, { Component } from 'react'
import { RaisedButton, Snackbar } from 'material-ui'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import BasicSpinner from '../misc/BasicSpinner'
import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  },
  tableHeader: {
    background: Theme.colors.neutlight,
  },
  tableHeaderColumn: {
    fontWeight: 700
  },
  rowClosed: {
    color: Theme.colors.neutlight_d2
  },
  acceptButton: {
    marginRight: Theme.padding.small
  }
}

class InvitesSettings extends Component {
  static getExpirationDate(invite) {
    const daysUntilExpiration = parseInt(invite.daysFromCreationUntilExpiration, 10)
    const millisPerDay = 24 * 60 * 60 * 1000
    const dateCreatedMillis = Date.parse(invite.createdAt)
    return new Date(dateCreatedMillis + (millisPerDay * daysUntilExpiration))
  }

  static getInviteActions(statusOpen, onAcceptInvite, onDeclineInvite) {
    if (statusOpen) {
      return (
        <span>
          <RaisedButton label="Accept" primary style={styles.acceptButton} onClick={onAcceptInvite} />
          <RaisedButton label="Decline" secondary onClick={onDeclineInvite} />
        </span>
      )
    }
    return <span />
  }

  constructor(props) {
    super(props)
    this.state = {
      snackOpen: false
    }
    this.getTableRow = this.getTableRow.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    this.acceptInviteHandler = this.acceptInviteHandler.bind(this)
    this.declineInviteHandler = this.declineInviteHandler.bind(this)
  }

  getTableRow(invite) {
    const statusOpen = (invite.status.toLowerCase() === 'open')
    const rowStyles = (statusOpen) ? {} : styles.rowClosed
    const inviteActions = InvitesSettings.getInviteActions(
      statusOpen,
      this.acceptInviteHandler(invite.id),
      this.declineInviteHandler(invite.id)
    )
    const expirationDate = InvitesSettings.getExpirationDate(invite)
    return (
      <TableRow key={invite.id}>
        <TableRowColumn style={rowStyles}>{invite.projectName}</TableRowColumn>
        <TableRowColumn style={rowStyles}>{expirationDate.toDateString()}</TableRowColumn>
        <TableRowColumn style={rowStyles}>{invite.status.toUpperCase()}</TableRowColumn>
        <TableRowColumn style={rowStyles}>{inviteActions}</TableRowColumn>
      </TableRow>
    )
  }

  acceptInviteHandler(inviteId) {
    return async () => {
      await this.props.onAcceptInvite(inviteId)
      this.setState({ snackOpen: true })
    }
  }

  declineInviteHandler(inviteId) {
    return async () => {
      await this.props.onDeclineInvite(inviteId)
      this.setState({ snackOpen: true })
    }
  }

  closeSnackbar() {
    this.setState({ snackOpen: false })
  }

  renderContents() {
    if (this.props.invites) {
      const invites = _.values(this.props.invites.all.byId)
      return (
        <Table fixedHeader>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            style={styles.tableHeader}
          >
            <TableRow>
              <TableHeaderColumn style={styles.tableHeaderColumn}>
                Project Name
              </TableHeaderColumn>
              <TableHeaderColumn style={styles.tableHeaderColumn}>
                Expiration
              </TableHeaderColumn>
              <TableHeaderColumn style={styles.tableHeaderColumn}>
                Status
              </TableHeaderColumn>
              <TableHeaderColumn style={styles.tableHeaderColumn} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {invites.map(this.getTableRow)}
          </TableBody>
        </Table>
      )
    }
    return <BasicSpinner />
  }

  render() {
    return (
      <div style={styles.container}>
        <h2>Project Invites</h2>
        {this.renderContents()}
        <Snackbar
          open={this.state.snackOpen}
          message="Changes have been saved successfully!"
          autoHideDuration={3000}
          onRequestClose={this.closeSnackbar}
          action="Dismiss"
          onActionClick={this.closeSnackbar}
        />
      </div>
    )
  }
}

InvitesSettings.propTypes = {
  invites: PropTypes.object.isRequired,
  onAcceptInvite: PropTypes.func.isRequired,
  onDeclineInvite: PropTypes.func.isRequired
}

export default InvitesSettings
