import React from 'react'
import { Divider, Drawer, MenuItem, Menu } from 'material-ui'
import PropTypes from 'prop-types'
import SvgIconHome from 'material-ui/svg-icons/action/home'
import SvgIconSettings from 'material-ui/svg-icons/action/settings'
import SvgIconTyr from 'material-ui/svg-icons/av/web-asset'
import Theme from '../../../style/theme'
import HammerLogo from '../../assets/icons/Viking_Hammer_Logo_1.png'

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
    width: '75px'
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
    width={336}
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
        leftIcon={<SvgIconHome style={getIconStyle('/home', currentRoute)} />}
      />
      <MenuItem
        style={getMenuStyle('/settings', currentRoute)}
        primaryText="Settings"
        leftIcon={<SvgIconSettings style={getIconStyle('/settings', currentRoute)} />}
      />
      <Divider />
      <MenuItem
        style={getMenuStyle('/tyr', currentRoute)}
        primaryText="Tyr CLI"
        leftIcon={<SvgIconTyr style={getIconStyle('/tyr', currentRoute)} />}
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
