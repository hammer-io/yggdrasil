import React, { Component } from 'react'
import Flexbox from 'flexbox-react'
import { Divider, RaisedButton } from 'material-ui'
import Theme from '../../style/theme'
import PageWrap from '../components/misc/PageWrap'
import TaleOfTwoCodersImg from '../assets/images/tale-of-two-coders.png'

const styles = {
  button: {
    width: '300px',
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
  },
  icon: {
    fill: Theme.colors.white,
    fontSize: '24px'
  },
  bannerImg: {
    backgroundImage: 'url("http://aag.aero/wp-content/uploads/2015/05/placeholder-banner-emerald.png")',
    height: '256px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
  },
  bannerTxt: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
  },
  image: {
    width: '100%'
  },
  divider: {
    display: 'block',
    backgroundColor: Theme.colors.neutlight_d1,
    marginTop: Theme.padding.regular,
    marginBottom: Theme.padding.regular
  }
}

class LandingPage extends Component {
  render() {
    return (
      <div>
        <div style={styles.bannerImg}>
          <div style={styles.bannerTxt}>
            <h1>HammerIO</h1>
            <p>A tool for developing, maintaining, and monitoring Node.js microservices.</p>
            <RaisedButton primary label="Get Started" />
          </div>
        </div>
        <PageWrap>
          <div style={styles.container}>
            <Flexbox flexWrap="wrap" alignItems="flex-start">
              <Flexbox flex="1" style={{ minWidth: 300 }}>
            In order to deploy a set of microservices to the cloud reliably, a developer must
            go through a significant amount of work to establish the infrastructure and build
            an automated deployment process. Students or small startups with limited knowledge,
            resources, or time are faced with a significant barrier when beginning a microservices
            project. The goal of HammerIO is to reduce the burden of developing, maintaining,
            and monitoring Node.js microservices for small teams.
              </Flexbox>
              <Flexbox flex="2 1 60%">
                <img src={TaleOfTwoCodersImg} alt="The Tale of Two Coders" style={styles.image} />
              </Flexbox>
            </Flexbox>
            <Divider style={styles.divider} />
            More stuff...
          </div>
        </PageWrap>
      </div>
    )
  }
}

export default LandingPage
