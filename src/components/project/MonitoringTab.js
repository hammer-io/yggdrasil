import React from 'react'
import Flexbox from 'flexbox-react'
import { connect } from 'react-redux'
import GraphHeartbeats from './monitoring/GraphHeartbeats'
import GraphHttpRequests from './monitoring/GraphHttpRequests'
import GraphOsData from './monitoring/GraphOsData'
import GraphUrls from './monitoring/GraphUrls'
import OsDataWidget from './monitoring/OsDataWidget'
import HttpRequestWidget from './monitoring/HttpRequestWidget'
import data from '../../../test/ProjectMonitoringTestData'
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

function MonitoringTab() {
  console.log(data.mockData)
  return (
    <div style={styles.container}>
      <Flexbox
        flexDirection="row"
        flexWrap="wrap"
        width="100%"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Flexbox>
          <GraphHeartbeats
            data={data.mockData.heartbeats.testskaditest}
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
            data={data.mockData.httpdata.testskaditest}
          />
        </Flexbox>
        <Flexbox>
          <GraphOsData
            data={data.mockData.osdata.testskaditest}
          />
        </Flexbox>
        <Flexbox>
          <GraphHttpRequests
            data={data.mockData.httpdata.testskaditest}
          />
        </Flexbox>
        <Flexbox>
          <GraphUrls
            data={data.mockData.httpdata.testskaditest}
          />
        </Flexbox>
      </Flexbox>
    </div>
  )
}

MonitoringTab.propTypes = {
}

const ExportedMonitoringTab = connect(
  mapStateToProps,
  null
)(MonitoringTab)

export default ExportedMonitoringTab
