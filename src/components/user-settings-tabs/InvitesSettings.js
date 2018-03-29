import _ from 'lodash'
import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import BasicSpinner from '../BasicSpinner'
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

  static getTableRow(invite) {
    function acceptInvite() {
      // TODO
      console.log(`TODO: Accepting invite ${invite.id}...`)
    }

    function declineInvite() {
      // TODO
      console.log(`TODO: Declining invite ${invite.id}...`)
    }

    const statusOpen = (invite.status.toLowerCase() === 'open')
    const rowStyles = (statusOpen) ? {} : styles.rowClosed
    const inviteActions = InvitesSettings.getInviteActions(statusOpen, acceptInvite, declineInvite)
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
            {invites.map(InvitesSettings.getTableRow)}
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
      </div>
    )
  }
}

InvitesSettings.propTypes = {
  invites: PropTypes.object.isRequired
}

export default InvitesSettings
