import React from 'react'
import Flexbox from 'flexbox-react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import GraphHeartbeats from './monitoring/GraphHeartbeats'
import GraphHttpRequests from './monitoring/GraphHttpRequests'
import GraphOsData from './monitoring/GraphOsData'
import GraphUrls from './monitoring/GraphUrls'
import OsDataWidget from './monitoring/OsDataWidget'
import HttpRequestWidget from './monitoring/HttpRequestWidget'
import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  }
}

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects,
  projectMembers: state.projectMembers
})

class MonitoringTab extends React.Component {
  constructor(props) {
    super(props)

    this.heartbeatRef = {}
    this.httpRef = {}
    this.osRef = {}
    this.state = {
      heartbeats: {},
      http: {},
      os: {},
      width: 0,
      height: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    const { projectId } = this.props
    const projectRef = firebase.database().ref(`projects/${projectId}`)
    this.heartbeatRef = projectRef.child('heartbeats')
    this.httpRef = projectRef.child('httpdata')
    this.osRef = projectRef.child('osdata')
    this.heartbeatRef.on('value', (snapshot) => {
      this.setState({
        heartbeats: snapshot.val()
      })
    })
    this.httpRef.on('value', (snapshot) => {
      this.setState({
        http: snapshot.val()
      })
    })
    this.osRef.on('value', (snapshot) => {
      this.setState({
        os: snapshot.val()
      })
    })
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    this.heartbeatRef.off()
    this.httpRef.off()
    this.osRef.off()
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }


  render() {
    const { heartbeats, http, os } = this.state
    const windowSize = {
      width: this.state.width,
      height: this.state.height
    }
    return (
      <div style={styles.container}>
        <Flexbox flexWrap="wrap" justifyContent="center">
          <Flexbox>
            <GraphHeartbeats
              data={heartbeats}
              windowSize={windowSize}
            />
          </Flexbox>
          <Flexbox>
            <OsDataWidget
              memoryFree={20}
              memoryUsed={10}
            />
          </Flexbox>
          <Flexbox>
            <HttpRequestWidget
              data={http}
            />
          </Flexbox>
          <Flexbox>
            <GraphOsData
              data={os}
              windowSize={windowSize}
            />
          </Flexbox>
          <Flexbox>
            <GraphHttpRequests
              data={http}
              windowSize={windowSize}
            />
          </Flexbox>
          <Flexbox>
            <GraphUrls
              data={http}
              windowSize={windowSize}
            />
          </Flexbox>
        </Flexbox>
      </div>
    )
  }
}

MonitoringTab.propTypes = {
  projectId: PropTypes.string.isRequired
}

const ExportedMonitoringTab = connect(
  mapStateToProps,
  null
)(MonitoringTab)

export default ExportedMonitoringTab
