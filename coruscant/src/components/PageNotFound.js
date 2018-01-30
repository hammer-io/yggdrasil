import React from 'react'
import Theme from './../../style/theme'
import Dialogue from './../assets/icons/404.png'
import Octocat from './../assets/icons/octocat.png'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px',
    backgroundColor: Theme.colors.grey400
  },
  text: {
    fontFamily: Theme.font.family.regular,
    color: Theme.colors.grey400
  }
}

const NotFound = () => (
  <div style={styles.container}>
    <img src={Dialogue} alt="" />
    <img src={Octocat} alt="" />
  </div>
)

export default NotFound
