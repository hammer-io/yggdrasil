import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Theme from '../../style/theme'

const styles = {
  header: {
    fontFamily: Theme.font.family.regular
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Theme.padding.regular
  }
}

const mapStateToProps = state => ({
  session: state.session
})

@connect(mapStateToProps)
class Home extends Component {
  componenDidMount() {
    console.log(this.props.session)
  }

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.header}>Welcome</h4>
      </div>
    )
  }
}

Home.propTypes = {
  session: PropTypes.func.isRequired
}

export default Home
