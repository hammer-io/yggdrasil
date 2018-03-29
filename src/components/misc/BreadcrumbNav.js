import { Link } from 'react-router-dom'
import SvgIconBook from 'material-ui/svg-icons/action/book'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SvgIconChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

import Theme from '../../../style/theme'

const styles = {
  container: {
    fontFamily: Theme.fontFamily,
    fontVariant: 'all-small-caps',
    textAlign: 'left'
  },
  anchor: {
    color: Theme.palette.anchorColor,
    textDecoration: 'none'
  },
  icon: {
    color: Theme.palette.anchorColor,
    position: 'relative',
    top: 6,
    marginRight: 6
  }
}

class BreadcrumbNav extends Component {
  getKey(index) {
    return `${this.props.keyPrefix}-${index}`
  }

  render() {
    const that = this

    function attachKey(item, index) {
      const itemPlus = item
      itemPlus.key = that.getKey(index)
      return itemPlus
    }

    function getNavItem(item, index) {
      if (index === 0) {
        return (
          <Link
            style={styles.anchor}
            to={item.location}
            key={item.key}
            onClick={that.props.onClick}
          >
            <SvgIconBook style={styles.icon} />{item.text}&nbsp;
          </Link>
        )
      }
      return (
        <Link style={styles.anchor} to={item.location} key={item.key} onClick={that.props.onClick}>
          <SvgIconChevronRight style={styles.icon} />{item.text}
        </Link>
      )
    }

    return (
      <div style={styles.container}>
        {this.props.items.map(attachKey).map(getNavItem)}
      </div>
    )
  }
}

BreadcrumbNav.propTypes = {
  items: PropTypes.array.isRequired,
  keyPrefix: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

BreadcrumbNav.defaultProps = {
  onClick: () => {}
}

export default BreadcrumbNav
