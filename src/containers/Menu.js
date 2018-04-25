/* eslint-disable quote-props */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AppBar } from 'material-ui'
import PropTypes from 'prop-types'
import { logout } from '../actions/session'
import Sidebar from '../components/misc/Sidebar'
import HammerIO from '../assets/icons/hammer-logo-wide-light-small.png'

const userMenuSelection = [
  'Home',
  'New Project',
  'Settings',
  'Sign Out',
]
const nonUserMenuSelection = [
  'About',
  'Login',
  'Register'
]
const menuItemURIs = {
  'Home': '/home',
  'New Project': '/projects/new',
  'Settings': '/settings',
  'Sign Out': '/login',
  'About': '/',
  'Login': '/login',
  'Register': '/register',
}

const styles = {
  titleImg: {
    height: 48,
    marginTop: 8
  }
}

const mapDispatchToProps = {
  logout
}

const mapStateToProps = state => ({
  session: state.session
})

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      drawerOpen: false
    }

    this.clickHammerLogo = this.clickHammerLogo.bind(this)
    this.clickToggleDrawer = this.clickToggleDrawer.bind(this)
    this.clickSidebarItem = this.clickSidebarItem.bind(this)
    this.updateDrawerState = this.updateDrawerState.bind(this)
  }

  clickHammerLogo() {
    if (this.props.session.authToken) {
      this.props.history.push('/home')
    } else {
      this.props.history.push('/')
    }
  }

  clickToggleDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  navigateToPage(uri) {
    const { history, location } = this.props
    if (location.pathname !== uri) {
      history.push(uri)
    }
  }

  clickSidebarItem(event, item) {
    const { session, logout } = this.props
    const itemClicked = item.props.primaryText

    if (itemClicked === 'Sign Out') {
      logout(session.authToken)
    }
    if (Object.keys(menuItemURIs).includes(itemClicked)) {
      this.navigateToPage(menuItemURIs[itemClicked])
    } else if (itemClicked === 'Tyr CLI') {
      this.navigateToPage('/tyr')
    }
    this.clickToggleDrawer()
  }

  updateDrawerState(open) {
    this.setState({ drawerOpen: open })
  }

  render() {
    const menuSelection = (this.props.session.authToken) ? userMenuSelection : nonUserMenuSelection
    return (
      <div>
        <AppBar
          title={<img src={HammerIO} alt="hammer-io" style={styles.titleImg} />}
          onTitleClick={this.clickHammerLogo}
          className="hover-pointer"
          onLeftIconButtonClick={this.clickToggleDrawer}
        />
        <Sidebar
          menuItemURIs={menuItemURIs}
          menuItemSelection={menuSelection}
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
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const ExportedMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default withRouter(ExportedMenu)
