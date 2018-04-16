import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle } from 'material-ui'
import { connect } from 'react-redux'
import Theme from '../../../../style/theme'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects,
  projectMembers: state.projectMembers
})

class ManageProject extends React.PureComponent {
  renderContent() {
    return (
      <div>
        <ConfirmDeleteDialog project={this.props.project} />
      </div>
    )
  }

  render() {
    if (this.props.projectMembers.fetchedOwners
      && (typeof this.props.projectMembers.owners.byId[this.props.session.user.id] !== 'undefined')) {
      return (
        <Card style={styles.container}>
          <CardTitle title="Manage Project" />
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

ManageProject.propTypes = {
  session: PropTypes.object.isRequired,
  projectMembers: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const ExportedManageProject = connect(
  mapStateToProps,
  null
)(ManageProject)

export default ExportedManageProject
