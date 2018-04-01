import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle, TextField, RaisedButton } from 'material-ui'
import Theme from '../../../../style/theme'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
}

class APIKey extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isRevealed: false
    }

    this.onClickRevealButton = this.onClickRevealButton.bind(this)
  }

  onClickRevealButton() {
    const { isRevealed } = this.state
    this.setState({ isRevealed: !isRevealed })
  }

  renderContent() {
    const { isRevealed } = this.state
    return (
      <div style={styles.content}>
        <TextField
          disabled
          id="text-field-disabled"
          type={isRevealed ? 'text' : 'password'}
          value={this.props.apiKey}
        />
        <RaisedButton
          primary
          label={isRevealed ? 'Hide' : 'Reveal'}
          onClick={this.onClickRevealButton}
        />
      </div>
    )
  }

  render() {
    if (this.props.apiKey && this.props.apiKey.length > 0) {
      return (
        <Card style={styles.container}>
          <CardTitle title="Koma API Key" />
          <CardText>
            {this.renderContent()}
          </CardText>
        </Card>
      )
    }

    return (
      null
    )
  }
}

APIKey.propTypes = {
  apiKey: PropTypes.string.isRequired
}

export default APIKey
