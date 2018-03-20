import React from 'react'
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import PropTypes from 'prop-types'
import HammerIO from './../assets/icons/hammer-logo-wide-light-small.png'

const styles = {
  titleImg: {
    height: 48,
    marginTop: 8
  }
}

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
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    )
  }

  render() {
    return (
      <AppBar
        title={<img src={HammerIO} alt="" style={styles.titleImg} />}
        onTitleClick={this.props.clickHammerLogo}
        className="hover-pointer"
        iconElementRight={this.renderIconRight()}
        onLeftIconButtonClick={this.props.clickToggleDrawer}
      />
    )
  }
}

Navbar.propTypes = {
  clickHammerLogo: PropTypes.func.isRequired,
  clickNavbarItem: PropTypes.func.isRequired,
  clickToggleDrawer: PropTypes.func.isRequired
}

export default Navbar
