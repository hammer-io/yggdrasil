import React from 'react'
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

class Navbar extends React.Component {

  renderIconRight () {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        onItemClick={this.props.clickNavbarItem}
      >
        <MenuItem primaryText="Send feedback" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    )
  }

  render () {
    return (
      <AppBar
        title="Hammer"
        iconElementRight={this.renderIconRight()}
        onLeftIconButtonClick={this.props.clickToggleDrawer}
      />
    )
  }
}

export default Navbar