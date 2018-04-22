import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { unmountComponentAtNode, createPortal } from 'react-dom'
import Circles from './Circles'

export default class FeatureDiscovery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pos: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
        width: 1
      }
    }

    this.handleResize = this.handleResize.bind(this)
    this.element = document.createElement('div')
  }

  componentDidMount() {
    document.body.appendChild(this.element)
    this.element.style.position = 'fixed'
    this.element.style.zIndex = '1'
    this.element.style.top = '0'
    this.element.style.left = '0'
    const pos = this.node.firstChild.getBoundingClientRect()
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ pos })
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleResize)
    unmountComponentAtNode(this.element)
  }

  handleResize() {
    const pos = this.node.firstChild.getBoundingClientRect()
    this.setState({ pos })
  }

  render() {
    const child = React.Children.only(this.props.children)
    const {
      title,
      text,
      onClose,
      open,
      backgroundColor
    } = this.props
    const { pos } = this.state

    return (
      <React.Fragment>
        <div ref={(node) => { this.node = node }}>
          { child }
        </div>
        {
          createPortal(
            (
              <Circles
                backgroundColor={backgroundColor}
                title={title}
                text={text}
                pos={pos}
                onClose={onClose}
                open={open}
              />
            ), this.element
          )
        }
      </React.Fragment>
    )
  }
}

FeatureDiscovery.propTypes = {
  /** Defines if the prompt is visible. */
  open: PropTypes.bool.isRequired,
  /** Fired when the the prompt is visible and clicked. */
  onClose: PropTypes.func.isRequired,
  /** The node which will be featured. */
  children: PropTypes.node.isRequired,
  /** Title  */
  title: PropTypes.string.isRequired,
  /** Info text */
  text: PropTypes.string.isRequired,
  /** Background color */
  backgroundColor: PropTypes.string.isRequired
}
