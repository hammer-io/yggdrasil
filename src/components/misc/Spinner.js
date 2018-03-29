import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import PropTypes from 'prop-types'

const Spinner = ({ size, thickness }) => (
  <CircularProgress size={size} thickness={thickness} />
)

Spinner.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number
}

Spinner.defaultProps = {
  size: 60,
  thickness: 7
}

export default Spinner
