import React from 'react'
import { Drawer, MenuItem, Menu } from 'material-ui'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Sidebar = ({ clickSidebarItem, updateDrawerState, drawerOpen }) => (
  <Drawer
    docked={false}
    width={300}
    open={drawerOpen}
    onRequestChange={updateDrawerState}
  >
    <Menu onItemClick={clickSidebarItem}>
      <MenuItem><NavLink to="/home">Home</NavLink></MenuItem>
      <MenuItem><NavLink to="/settings">Settings</NavLink></MenuItem>
    </Menu>
  </Drawer>
)

Sidebar.propTypes = {
  clickSidebarItem: PropTypes.func.isRequired,
  updateDrawerState: PropTypes.func.isRequired,
  drawerOpen: PropTypes.bool.isRequired
}

export default Sidebar
