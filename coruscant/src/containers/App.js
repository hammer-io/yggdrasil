import React, {Component} from 'react'
import theme from "../../style/theme.js"

class App extends Component {

  // componentDidUpdate(prevProps) {
  //   const { dispatch, redirectUrl } = this.props
  //   const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
  //   const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn
  //
  //   if (isLoggingIn) {
  //     dispatch(navigateTo(redirectUrl))
  //   } else if (isLoggingOut) {
  //     // do any kind of cleanup or post-logout redirection here
  //   }
  // }

  render() {
    return (
      <div>
        {
          this.props.children
        }
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     isLoggedIn: state.loggedIn,
//     redirectUrl: state.redirectUrl
//   }
// }

export default App