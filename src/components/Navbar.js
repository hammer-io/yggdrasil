import React from 'react'
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import PropTypes from 'prop-types'

class Navbar extends React.Component {
  renderIconRight() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        onItemClick={this.props.clickNavbarItem}
      >
        <MenuItem primaryText="New Project" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    )
  }

  render() {
    return (
      <AppBar
        title="Hammer"
        iconElementRight={this.renderIconRight()}
        onLeftIconButtonClick={this.props.clickToggleDrawer}
      />
    )
  }
}

Navbar.propTypes = {
  clickNavbarItem: PropTypes.func.isRequired,
  clickToggleDrawer: PropTypes.func.isRequired
}

export default Navbar
