import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { RaisedButton } from 'material-ui'
import Theme from './../../style/theme'
import PageWrap from './PageWrap'
import BasicSpinner from './BasicSpinner'
import Divider from './Divider'

const repositoryUrl = 'https://github.com/hammer-io/tyr'
const readmeUrl = 'https://raw.githubusercontent.com/hammer-io/tyr/master/README.md'

function onClickVisitGitHub() {
  window.open(repositoryUrl, '_blank')
}

const styles = {
  button: {
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    marginBottom: Theme.padding.regular
  },
  container: {
    padding: Theme.padding.regular,
    minWidth: 'inherit',
    maxWidth: 'inherit',
    width: 'inherit'
  }
}

class TyrInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markdown: null
    }
  }

  componentWillMount() {
    const options = {
      method: 'GET',
      Accept: 'text/plain'
    }
    fetch(readmeUrl, options)
      .then(async (response) => {
        const text = await response.text()
        this.setState({
          markdown: text
        })
      })
      .catch(console.error)
  }

  renderContent() {
    if (this.state.markdown) {
      return <ReactMarkdown source={this.state.markdown} />
    }
    return <BasicSpinner />
  }

  render() {
    return (
      <PageWrap title="Tyr - The HammerIO Command Line Tool">
        <div style={styles.container}>
          <RaisedButton
            label="Visit the GitHub Repository"
            secondary
            onClick={onClickVisitGitHub}
            style={styles.button}
          />
          <Divider />
          {this.renderContent()}
        </div>
      </PageWrap>
    )
  }
}

export default TyrInfo
