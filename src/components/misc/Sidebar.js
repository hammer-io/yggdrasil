import React from 'react'
import { Divider, Drawer, MenuItem, Menu } from 'material-ui'
import PropTypes from 'prop-types'
import SvgIconNewProject from 'material-ui/svg-icons/content/add-circle'
import SvgIconHome from 'material-ui/svg-icons/action/home'
import SvgIconLogin from 'material-ui/svg-icons/social/person'
import SvgIconRegister from 'material-ui/svg-icons/social/person-add'
import SvgIconSettings from 'material-ui/svg-icons/action/settings'
import SvgIconSignOut from 'material-ui/svg-icons/action/exit-to-app'
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

const renderIcon = (text, uri, currentRoute) => {
  switch (text) {
    case 'Home':
      return <SvgIconHome style={getIconStyle(uri, currentRoute)} />
    case 'New Project':
      return <SvgIconNewProject style={getIconStyle(uri, currentRoute)} />
    case 'Settings':
      return <SvgIconSettings style={getIconStyle(uri, currentRoute)} />
    case 'Sign Out':
      return <SvgIconSignOut style={getIconStyle(uri, currentRoute)} />
    case 'About':
      return <SvgIconHome style={getIconStyle(uri, currentRoute)} />
    case 'Login':
      return <SvgIconLogin style={getIconStyle(uri, currentRoute)} />
    case 'Register':
      return <SvgIconRegister style={getIconStyle(uri, currentRoute)} />
    default:
      return <div style={styles.icon} />
  }
}

const renderMenuItem = (text, uri, currentRoute) => (
  <MenuItem
    key={`SidebarMenuItem-${uri}`}
    style={getMenuStyle(uri, currentRoute)}
    primaryText={text}
    leftIcon={renderIcon(text, uri, currentRoute)}
  />
)


const Sidebar = ({
  menuItemURIs,
  menuItemSelection,
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
      {menuItemSelection.map(text => renderMenuItem(text, menuItemURIs[text], currentRoute))}
      <Divider />
      <MenuItem
        key="SidebarMenuItem-/tyr"
        style={getMenuStyle('/tyr', currentRoute)}
        primaryText="Tyr CLI"
        leftIcon={<SvgIconTyr style={getIconStyle('/tyr', currentRoute)} />}
      />
    </Menu>
  </Drawer>
)

Sidebar.propTypes = {
  menuItemURIs: PropTypes.object.isRequired,
  menuItemSelection: PropTypes.array.isRequired,
  clickSidebarItem: PropTypes.func.isRequired,
  updateDrawerState: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  currentRoute: PropTypes.string.isRequired
}

export default Sidebar
