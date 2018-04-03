import React from 'react'
import PropTypes from 'prop-types'

// SVG Credit: https://icons8.com/

const HerokuFilledLogo = ({ width, height, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" version="1.1" width={width} height={height} style={style}>
    <g>
      <path d="M 40 2 L 12 2 C 9.242188 2 7 4.242188 7 7 L 7 43 C 7 45.757813 9.242188 48 12 48 L 40 48 C 42.757813 48 45 45.757813 45 43 L 45 7 C 45 4.242188 42.757813 2 40 2 Z M 16.558594 40.914063 L 16.558594 30.964844 L 21.535156 35.941406 Z M 35.261719 40.945313 L 30.496094 40.945313 L 30.496094 23.472656 C 30.496094 23.472656 31.632813 19.289063 16.496094 25.183594 C 16.46875 25.257813 16.46875 9.023438 16.46875 9.023438 L 21.414063 8.996094 L 21.414063 19.394531 C 21.414063 19.394531 35.261719 13.941406 35.261719 23.53125 Z M 33.3125 15.289063 L 28.066406 15.289063 C 29.957031 12.980469 31.664063 9.023438 31.664063 9.023438 L 37.089844 9.023438 C 37.089844 9.023438 36.160156 11.601563 33.3125 15.289063 Z " />
    </g>
  </svg>
)

HerokuFilledLogo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object
}

HerokuFilledLogo.defaultProps = {
  height: '50px',
  width: '50px',
  style: { fill: '#6762a6' }
}

export default HerokuFilledLogo
