import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../actions/session'
import Navbar from '../components/misc/Navbar'
import Sidebar from '../components/misc/Sidebar'

const mapDispatchToProps = {
  logout
}

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      drawerOpen: false
    }

    this.clickHammerLogo = this.clickHammerLogo.bind(this)
    this.clickNavbarItem = this.clickNavbarItem.bind(this)
    this.clickToggleDrawer = this.clickToggleDrawer.bind(this)
    this.clickSidebarItem = this.clickSidebarItem.bind(this)
    this.updateDrawerState = this.updateDrawerState.bind(this)
  }

  clickHammerLogo() {
    this.props.history.push('/home')
  }

  clickNavbarItem(event, item) {
    const { history, logout } = this.props
    if (item.props.primaryText === 'Sign out') {
      logout()
      history.push('/login')
    } else if (item.props.primaryText === 'New Project') {
      history.push('/projects/new')
    }
  }

  clickToggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  clickSidebarItem(event, item) {
    const { history, location } = this.props
    if (item.props.primaryText === 'Home' && location.pathname !== '/home') {
      history.push('/home')
    } else if (item.props.primaryText === 'Settings' && location.pathname !== '/settings') {
      history.push('/settings')
    } else if (item.props.primaryText === 'Tyr CLI' && location.pathname !== '/tyr') {
      history.push('/tyr')
    }
    this.clickToggleDrawer()
  }

  updateDrawerState(open) {
    this.setState({ drawerOpen: open })
  }

  render() {
    return (
      <div>
        <Navbar
          clickHammerLogo={this.clickHammerLogo}
          clickNavbarItem={this.clickNavbarItem}
          clickToggleDrawer={this.clickToggleDrawer}
        />
        <Sidebar
          clickSidebarItem={this.clickSidebarItem}
          updateDrawerState={this.updateDrawerState}
          drawerOpen={this.state.drawerOpen}
          currentRoute={this.props.location.pathname}
        />
      </div>
    )
  }
}

Menu.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const ExportedMenu = connect(
  null,
  mapDispatchToProps
)(Menu)

export default withRouter(ExportedMenu)
