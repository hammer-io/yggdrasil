import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle } from 'material-ui'
import Theme from '../../../../style/theme'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

class OsDataWidget extends React.PureComponent {
  render() {
    return (
      <Card style={styles.container}>
        <CardTitle title="Current Memory Usage" />
        <CardText>
          <p>{`Memory Used : ${this.props.memoryUsed}`}</p>
          <p>{`Memory Free : ${this.props.memoryFree}`}</p>
        </CardText>
      </Card>
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
