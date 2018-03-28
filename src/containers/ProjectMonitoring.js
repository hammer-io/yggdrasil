import React from 'react'
import Flexbox from 'flexbox-react'
import { connect } from 'react-redux'
import GraphHeartbeats from '../components/GraphHeartbeats'
import GraphHttpRequests from '../components/GraphHttpRequests'
import GraphOsData from '../components/GraphOsData'
import GraphUrls from '../components/GraphUrls'
import OsDataWidget from '../components/OsDataWidget'
import HttpRequestWidget from '../components/HttpRequestWidget'
import data from '../../test/ProjectMonitoringTestData'

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects,
  projectMembers: state.projectMembers
})

function ProjectMonitoring() {
  console.log(data.mockData)
  return (
    <div>
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

ProjectMonitoring.propTypes = {
}

const ExportedProjectMonitoring = connect(
  mapStateToProps,
  null
)(ProjectMonitoring)

export default ExportedProjectMonitoring
