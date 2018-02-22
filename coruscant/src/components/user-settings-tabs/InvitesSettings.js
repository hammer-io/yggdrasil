import React from 'react'
import { RaisedButton } from 'material-ui'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

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

const tableData = [
  {
    id: 'abc1',
    projectName: 'drumitdown',
    expirationDate: '2018-03-01',
    status: 'Open',
  },
  {
    id: 'abc2',
    projectName: 'tmnt',
    expirationDate: '2018-01-23',
    status: 'Expired',
  },
  {
    id: 'abc3',
    projectName: 'hammer-io',
    expirationDate: '2018-02-18',
    status: 'Accepted',
  }
]


function getTableRow(data) {
  function acceptInvite() {
    console.log(`TODO: Accepting invite ${data.id}...`)
  }

  function declineInvite() {
    console.log(`TODO: Declining invite ${data.id}...`)
  }
  const statusOpen = (data.status.toLowerCase() === 'open')
  const rowStyles = (statusOpen)
    ? {}
    : styles.rowClosed
  const inviteActions = (statusOpen)
    ? (
      <span>
        <RaisedButton label="Accept" primary style={styles.acceptButton} onClick={acceptInvite} />
        <RaisedButton label="Decline" secondary onClick={declineInvite} />
      </span>
    )
    : <span />
  return (
    <TableRow key={data.id}>
      <TableRowColumn style={rowStyles}>{data.projectName}</TableRowColumn>
      <TableRowColumn style={rowStyles}>{data.expirationDate}</TableRowColumn>
      <TableRowColumn style={rowStyles}>{data.status}</TableRowColumn>
      <TableRowColumn style={rowStyles}>{inviteActions}</TableRowColumn>
    </TableRow>
  )
}

const InvitesSettings = () => (
  <div style={styles.container}>
    <h2>Project Invites</h2>
    <Table fixedHeader>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={styles.tableHeader}>
        <TableRow>
          <TableHeaderColumn style={styles.tableHeaderColumn} tooltip="Name of the project you've been invited to">
            Project Name
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.tableHeaderColumn} tooltip="The date this invite will expire">
            Expiration
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.tableHeaderColumn} tooltip="Invite Status">
            Status
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.tableHeaderColumn} tooltip="Actions you can take on the invite" />
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover>
        {tableData.map(getTableRow)}
      </TableBody>
    </Table>

  </div>
)

export default InvitesSettings
