import React, { Component } from 'react'
import theme from "../../style/theme.js"

import Navbar from './Navbar'
import Sidebar from './Sidebar'

class Menu extends Component {

  constructor (props) {
    super(props)

    this.state = {
      drawerOpen: false
    }

    this.clickNavbarItem = this.clickNavbarItem.bind(this)
    this.clickToggleDrawer = this.clickToggleDrawer.bind(this)
    this.clickSidebarItem = this.clickSidebarItem.bind(this)
    this.updateDrawerState = this.updateDrawerState.bind(this)
  }

  componentDidUpdate(prevProps) {
    // const { dispatch, redirectUrl } = this.props
    // const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    // const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn
    //
    // if (isLoggingIn) {
    //   dispatch(navigateTo(redirectUrl))
    // } else if (isLoggingOut) {
    //   // do any kind of cleanup or post-logout redirection here
    // }
  }

  clickNavbarItem (event, item) {
    console.log(item.props.primaryText)
  }

  clickToggleDrawer () {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  clickSidebarItem (event, item) {
    console.log(item)
  }

  updateDrawerState (open) {
    this.setState({ drawerOpen: open })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Navbar
          clickNavbarItem={this.clickNavbarItem}
          clickToggleDrawer={this.clickToggleDrawer}
        />
        <Sidebar
          clickSidebarItem={this.clickSidebarItem}
          updateDrawerState={this.updateDrawerState}
          drawerOpen={this.state.drawerOpen}
        />
      </div>
    )
  }
}

export default Menu