import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Theme from '../../../style/theme'
import { hideError, setError } from '../../actions/error'

const mapStateToProps = state => ({
  session: state.session,
  error: state.error
})

const mapDispatchToProps = {
  hideError, setError
}

class ErrorSnackbar extends React.Component {
  setError(errorMessage) {
    const { setError } = this.props
    setError(errorMessage)
  }
  closeSnackbar() {
    const { hideError } = this.props
    hideError()
  }

  render() {
    return (
      <div>
        <Snackbar
          bodyStyle={{
 backgroundColor: Theme.colors.red500, borderColor: Theme.colors.black, borderStyle: 'solid', borderWidth: '2px'
}}
          open={this.props.error.open}
          message={this.props.error.errorMessage}
          autoHideDuration={5000}
          onRequestClose={() => this.closeSnackbar()}
        />
      </div>
    )
  }
}

ErrorSnackbar.propTypes = {
  error: PropTypes.object.isRequired,
  hideError: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

const ExportedErrorSnackbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorSnackbar)

export default ExportedErrorSnackbar
