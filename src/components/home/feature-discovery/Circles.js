import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Circles extends Component {
  constructor(props) {
    super(props)

    const styleElement = document.createElement('style')
    document.head.appendChild(styleElement)
    const styleSheet = styleElement.sheet

    const innerKeyframe = `
    @keyframes innerPulse {
      0%      { transform: scale(1.0); }    
      100%    { transform: scale(1.1); }
    }`
    const outerKeyframe = `
    @keyframes outerPulse {
      0%      { transform: scale(1.0); opacity: 0.9 }    
      100%    { transform: scale(2.0); opacity: 0.0 }
    }`

    styleSheet.insertRule(innerKeyframe, styleSheet.cssRules.length)
    styleSheet.insertRule(outerKeyframe, styleSheet.cssRules.length)
  }

  getStyles() {
    const { backgroundColor, pos, open } = this.props

    const circleSize = pos.width + 40
    const outerCircleSize = 900

    return {
      circles: {
        position: 'absolute',
        top: pos.top - 20,
        left: pos.left - 20,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'inherit' : 'none',
        width: `${outerCircleSize}px`,
        height: `${outerCircleSize}px`,
      },
      pulseInnerCircle: {
        position: 'absolute',
        transformOrigin: 'center center',
        height: `${circleSize}px`,
        width: `${circleSize}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        animation: open ? 'innerPulse 872ms 1.2s cubic-bezier(0.4, 0, 0.2, 1) alternate infinite' : null,
        transform: open ? 'scale(1)' : 'scale(0)',
        transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1)'
      },
      pulseOuterCircle: {
        position: 'absolute',
        transformOrigin: 'center center',
        height: `${circleSize}px`,
        width: `${circleSize}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        opacity: 0,
        animation: open ? 'outerPulse 1744ms 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' : null
      },
      outerCircle: {
        position: 'absolute',
        transformOrigin: 'center center',
        transform: open ? 'scale(1.0)' : 'scale(0.8)',
        transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1), opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)',
        marginTop: `-${(outerCircleSize / 2) - (circleSize / 2)}px`,
        marginLeft: `-${(outerCircleSize / 2) - (circleSize / 2)}px`,
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        backgroundColor,
        opacity: open ? 0.9 : 0
      },
      content: {
        position: 'relative',
        height: '450px',
        width: '450px',
        verticalAlign: 'bottom',
        display: 'table-cell',
        padding: '50px'
      },
      textBox: {
        zIndex: 25000,
        padding: '50px',
        marginBottom: '120px'
      },
      title: {
        fontFamily: 'Roboto',
        fontSize: '32px',
        color: '#ffffff',
        paddingBottom: '10px'
      },
      text: {
        fontFamily: 'Roboto',
        fontSize: '20px',
        color: '#ffffff',
        opacity: 0.6
      }
    }
  }

  render() {
    const styles = this.getStyles()
    const { title, text, onClose } = this.props

    return (
      <div style={styles.circles} onClick={onClose} role="presentation">
        <div style={styles.outerCircle}>
          <div style={styles.content}>
            <div style={styles.textBox}>
              <div style={styles.title}>{title}</div>
              <div style={styles.text}>{text}</div>
            </div>
          </div>
        </div>
        <div style={styles.pulseInnerCircle} />
        <div style={styles.pulseOuterCircle} />
      </div>
    )
  }
}

Circles.propTypes = {
  /** Defines if the prompt is visible */
  open: PropTypes.bool.isRequired,
  /** Fired when the the prompt is visible and clicked */
  onClose: PropTypes.func.isRequired,
  /** Title */
  title: PropTypes.string.isRequired,
  /** Info text */
  text: PropTypes.string.isRequired,
  /** Background color */
  backgroundColor: PropTypes.string.isRequired,
  /** Position of child component */
  pos: PropTypes.object.isRequired
}
