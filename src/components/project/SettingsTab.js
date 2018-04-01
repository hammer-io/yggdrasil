/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import Flexbox from 'flexbox-react'
import PropTypes from 'prop-types'
import Theme from '../../../style/theme'
import APIKey from './settings/APIKey'

const styles = {
  container: {
    padding: Theme.padding.tiny
  },
  card: {
    width: '100%',
    margin: Theme.padding.tiny
  },
}

class SettingsTab extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Flexbox flexWrap="wrap">
          <APIKey apiKey={this.props.project.komaApiKey} />
        </Flexbox>
      </div>
    )
  }
}

SettingsTab.propTypes = {
  project: PropTypes.object.isRequired
}

export default SettingsTab
