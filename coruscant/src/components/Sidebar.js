import React from 'react'
import { Drawer, MenuItem, Menu } from 'material-ui'
import { NavLink } from 'react-router-dom'

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

export default Sidebar