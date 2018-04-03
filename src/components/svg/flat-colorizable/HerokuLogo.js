import React from 'react'
import PropTypes from 'prop-types'

// SVG Credit: https://icons8.com/

const HerokuLogo = ({ width, height, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" version="1.1" width={width} height={height} style={style}>
    <g>
      <path d="M 12 2 C 9.25 2 7 4.25 7 7 L 7 43 C 7 45.75 9.25 48 12 48 L 40 48 C 42.75 48 45 45.75 45 43 L 45 7 C 45 4.25 42.75 2 40 2 Z M 12 4 L 40 4 C 41.667969 4 43 5.332031 43 7 L 43 43 C 43 44.667969 41.667969 46 40 46 L 12 46 C 10.332031 46 9 44.667969 9 43 L 9 7 C 9 5.332031 10.332031 4 12 4 Z M 21.40625 9 L 16.46875 9.03125 C 16.46875 9.03125 16.472656 25.261719 16.5 25.1875 C 31.636719 19.296875 30.5 23.46875 30.5 23.46875 L 30.5 40.9375 L 35.25 40.9375 L 35.25 23.53125 C 35.25 13.941406 21.40625 19.40625 21.40625 19.40625 Z M 31.65625 9.03125 C 31.65625 9.03125 29.949219 12.972656 28.0625 15.28125 L 33.3125 15.28125 C 36.160156 11.59375 37.09375 9.03125 37.09375 9.03125 Z M 16.5625 30.96875 L 16.5625 40.90625 L 21.53125 35.9375 Z " />
    </g>
  </svg>
)

HerokuLogo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object
}

HerokuLogo.defaultProps = {
  height: '50px',
  width: '50px',
  style: { fill: '#6762a6' }
}

export default HerokuLogo
