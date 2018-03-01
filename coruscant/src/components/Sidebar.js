import React from 'react'
import { Drawer, MenuItem, Menu } from 'material-ui'
import PropTypes from 'prop-types'
import Home from 'material-ui/svg-icons/action/home'
import Settings from 'material-ui/svg-icons/action/settings'
import WebAsset from 'material-ui/svg-icons/av/web-asset'
import Theme from '../../style/theme'
import HammerLogo from './../assets/icons/Viking_Hammer_Logo_1.png'

const styles = {
  cardMedia: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50px',
    paddingBottom: '50px'
  },
  image: {
    height: '75px',
    width: '75px',
    minWidth: '0px'
  },
  menuItem: {
    fontWeight: Theme.font.weight.heavy,
    lineHeight: '58px',
    color: Theme.colors.grey600
  },
  icon: {
    height: '32px',
    width: '32px'
  }
}

const getIconStyle = (itemName, currentRoute) => {
  if (itemName === currentRoute) {
    return {
      ...styles.icon,
      fill: Theme.colors.accent
    }
  }
  return styles.icon
}

const getMenuStyle = (itemName, currentRoute) => {
  if (itemName === currentRoute) {
    return {
      ...styles.menuItem,
      color: Theme.colors.accent,
      backgroundColor: Theme.colors.neutlight_u4
    }
  }
  return styles.menuItem
}

const Sidebar = ({
  clickSidebarItem,
  updateDrawerState,
  drawerOpen,
  currentRoute
}) => (
  <Drawer
    docked={false}
    width={300}
    open={drawerOpen}
    onRequestChange={updateDrawerState}
  >
    <div style={styles.cardMedia}>
      <img src={HammerLogo} style={styles.image} alt="" />
    </div>
    <Menu onItemClick={clickSidebarItem}>
      <MenuItem
        style={getMenuStyle('/home', currentRoute)}
        primaryText="Home"
        leftIcon={<Home style={getIconStyle('/home', currentRoute)} />}
      />
      <MenuItem
        style={getMenuStyle('/tyr', currentRoute)}
        primaryText="Tyr"
        leftIcon={<WebAsset style={getIconStyle('/tyr', currentRoute)} />}
      />
      <MenuItem
        style={getMenuStyle('/settings', currentRoute)}
        primaryText="Settings"
        leftIcon={<Settings style={getIconStyle('/settings', currentRoute)} />}
      />
    </Menu>
  </Drawer>
)

Sidebar.propTypes = {
  clickSidebarItem: PropTypes.func.isRequired,
  updateDrawerState: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  currentRoute: PropTypes.string.isRequired
}

export default Sidebar
