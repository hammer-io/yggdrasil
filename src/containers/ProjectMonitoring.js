import React, { Component } from 'react'
import Flexbox from 'flexbox-react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { connect } from 'react-redux'
import GraphHeartbeats from '../components/GraphHeartbeats'
import GraphHttpRequests from '../components/GraphHttpRequests'
import GraphOsData from '../components/GraphOsData'

const iconButtonElement = (
  <IconButton touch>
    <MoreVertIcon />
  </IconButton>
)

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects,
  projectMembers: state.projectMembers
})

const mapDispatchToProps = {
}


const mockData = {
  "heartbeats" : {
    "testskaditest" : {
      "-L70SVTH_bP8FQmyJu8d" : {
        "timestamp" : 1520442934996
      },
      "-L70SVdNnCxSPOY_T11_" : {
        "timestamp" : 1520442935903
      },
      "-L70SVswqHUaKHNGTyfg" : {
        "timestamp" : 1520442936899
      },
      "-L70SW7gGuW2saLVDyI4" : {
        "timestamp" : 1520442937906
      },
      "-L70ZCUMklS8xo3lypQZ" : {
        "timestamp" : 1520444692262
      },
      "-L70ZCea0Zj6tI6FdwBO" : {
        "timestamp" : 1520444693174
      },
      "-L70ZCuBAxBwXgbmSRbo" : {
        "timestamp" : 1520444694173
      },
      "-L70ZD8tEYwDTNnNyYbX" : {
        "timestamp" : 1520444695178
      },
      "-L70ZDOZouqXDBTukIRf" : {
        "timestamp" : 1520444696181
      },
      "-L70Zn3AYKAgSfW7woPD" : {
        "timestamp" : 1520444846153
      },
      "-L70ZnE-TTiJR1qpylS2" : {
        "timestamp" : 1520444847058
      },
      "-L70ZnTdHs3PONeyGbWr" : {
        "timestamp" : 1520444848058
      },
      "-L70_6RiGW9X2ahfXUzO" : {
        "timestamp" : 1520444929856
      },
      "-L70_6fuoHxZCPQwpsoX" : {
        "timestamp" : 1520444930828
      },
      "-L70aS4cd9S7TVQkDVqv" : {
        "timestamp" : 1520445280634
      },
      "-L70aSJkXNA_cxvo3Y8T" : {
        "timestamp" : 1520445281602
      },
      "-L70aSZV38i_p3aKxvXY" : {
        "timestamp" : 1520445282610
      }
    }
  },
  "httpdata" : {
    "testskaditest" : {
      "-L77bJMbeGVA663Cz0q1" : {
        "timestamp" : 1520562946383,
        "type" : "response",
        "url" : "/"
      },
      "-L77bJMzKTgH6g036uUf" : {
        "size" : 0,
        "timestamp" : 1520562946395,
        "type" : "request",
        "url" : "/"
      }
    }
  },
  "osdata" : {
    "testskaditest" : {
      "-L70SVeYtiqkyYhY_oi2" : {
        "freeMemory" : 258854912,
        "memoryUsed" : 0.015067338943481445,
        "timestamp" : 1520442934892,
        "totalMemory" : 17179869184
      },
      "-L70SVszkKxbIkf9b_LL" : {
        "freeMemory" : 169017344,
        "memoryUsed" : 0.009838104248046875,
        "timestamp" : 1520442935895,
        "totalMemory" : 17179869184
      },
      "-L70SW7cBVVJr0GWa3Fp" : {
        "freeMemory" : 158969856,
        "memoryUsed" : 0.009253263473510742,
        "timestamp" : 1520442936896,
        "totalMemory" : 17179869184
      },
      "-L70SWNKPd69csLPsWEj" : {
        "freeMemory" : 311009280,
        "memoryUsed" : 0.01810312271118164,
        "timestamp" : 1520442937900,
        "totalMemory" : 17179869184
      },
      "-L70ZCfh5eC2eGmqNrwo" : {
        "freeMemory" : 149897216,
        "memoryUsed" : 0.008725166320800781,
        "timestamp" : 1520444692163,
        "totalMemory" : 17179869184
      },
      "-L70ZCuChNLtmueVdq7g" : {
        "freeMemory" : 139628544,
        "memoryUsed" : 0.008127450942993164,
        "timestamp" : 1520444693166,
        "totalMemory" : 17179869184
      },
      "-L70ZD8r7WiWHxFRPezS" : {
        "freeMemory" : 139337728,
        "memoryUsed" : 0.008110523223876953,
        "timestamp" : 1520444694167,
        "totalMemory" : 17179869184
      },
      "-L70ZDOVg3bwm-g24HAR" : {
        "freeMemory" : 33501184,
        "memoryUsed" : 0.0019500255584716797,
        "timestamp" : 1520444695169,
        "totalMemory" : 17179869184
      },
      "-L70ZDdDch1Hx8DQ1TM1" : {
        "freeMemory" : 32964608,
        "memoryUsed" : 0.001918792724609375,
        "timestamp" : 1520444696174,
        "totalMemory" : 17179869184
      },
      "-L70aSKHSsPgggmBVIqN" : {
        "freeMemory" : 208609280,
        "memoryUsed" : 0.012142658233642578,
        "timestamp" : 1520445280590,
        "totalMemory" : 17179869184
      },
      "-L70aSZT-RmOdRtiu7MD" : {
        "freeMemory" : 208875520,
        "memoryUsed" : 0.01215815544128418,
        "timestamp" : 1520445281596,
        "totalMemory" : 17179869184
      },
      "-L70aSoBNaqaHPSaovy6" : {
        "freeMemory" : 209506304,
        "memoryUsed" : 0.01219487190246582,
        "timestamp" : 1520445282601,
        "totalMemory" : 17179869184
      }
    }
  }
}

class ProjectMonitoring extends Component {
  render() {
    const owners = _.values(this.props.projectMembers.owners.byId)
    const contributors = _.values(this.props.projectMembers.contributors.byId)
    return (
      <div>
        <Flexbox
          flexDirection="row"
          flexWrap="wrap"
          width="90%"
          justifyContent="space-around"
          alignItems="flex-start"
        >
          <Flexbox>
            <GraphHeartbeats
              data={mockData.heartbeats.testskaditest}
            />
          </Flexbox>
          <Flexbox>
            <GraphOsData
              data={mockData.osdata.testskaditest}
            />
          </Flexbox>
          <Flexbox>
            <GraphHttpRequests
              data={mockData.httpdata.testskaditest}
            />
          </Flexbox>
        </Flexbox>
      </div>
    )
  }
}

ProjectMonitoring.propTypes = {
  projectId: PropTypes.string.isRequired,
}

const ExportedProjectMonitoring = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMonitoring)

export default ExportedProjectMonitoring
