import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import Theme from '../../style/theme'


class OsDataWidget extends React.PureComponent {
  render() {
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Current Memory Usage</div>
          <Divider />
          <p>{`Memory Used : ${this.props.memoryUsed}`}</p>
          <p>{`Memory Free : ${this.props.memoryFree}`}</p>
        </Paper>
      </div>
    )
  }
}

OsDataWidget.defaultProps = {
  memoryUsed: 0,
  memoryFree: 0,
}

OsDataWidget.propTypes = {
  memoryUsed: PropTypes.number,
  memoryFree: PropTypes.number,
}

export default OsDataWidget
