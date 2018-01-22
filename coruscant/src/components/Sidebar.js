import React from 'react'
import { Drawer, MenuItem, Menu } from 'material-ui'

const Sidebar = ({ clickSidebarItem, updateDrawerState, drawerOpen }) => (
  <Drawer
    docked={false}
    width={300}
    open={drawerOpen}
    onRequestChange={updateDrawerState}
  >
    <Menu onItemClick={clickSidebarItem}>
      <MenuItem>Home</MenuItem>
      <MenuItem>Settings</MenuItem>
    </Menu>
  </Drawer>
)

export default Sidebar