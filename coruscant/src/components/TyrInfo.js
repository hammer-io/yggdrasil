import React from 'react'
import Theme from './../../style/theme'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '80px',
    marginLeft: '100px',
    marginRight: '100px'
  },
  header: {
    fontFamily: Theme.font.family.regular,
    fontWeight: Theme.font.weight.regular,
    color: Theme.palette.primary1Color,
    fontSize: '34px'
  },
  subheader: {
    fontFamily: Theme.font.family.regular,
    fontWeight: Theme.font.weight.regular,
    color: Theme.palette.primary1Color,
  },
  text: {
    fontFamily: Theme.font.family.regular
  }
}

const TyrInfo = () => (
  <div style={styles.container}>
    <h1 style={styles.header}>Tyr</h1>
    <p style={styles.text}>
      A CLI tool to scaffold Node.js microservice applications with DevOps capabilities.
      It takes an opinionated approach, meaning we have done the homework and start you off
      with what we think are the best tools for a small team creating a new open-source project.
      Upon running the CLI tool, it will ask you a series of questions and use the answers to
      do the following:
      <ul>
        <li>Generate a new Node.js project</li>
        <li>Add testing, web, and database frameworks</li>
        <li>Initialize and push the code to a new GitHub repository</li>
        <li>Establish a continuous integration environment</li>
        <li>Build a Docker container for the code</li>
        <li>Deploy the app container to a cloud service</li>
      </ul>
    </p>
    <h2 style={styles.subheader}>Usage</h2>
    <p style={styles.text}>For installation and usage instructions check out the Github <a href="https://github.com/hammer-io/tyr">page</a>.</p>
  </div>
)

export default TyrInfo
