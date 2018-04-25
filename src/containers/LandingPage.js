/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Flexbox from 'flexbox-react'
import { Card, CardMedia, CardText, CardTitle, Divider, RaisedButton } from 'material-ui'
import PropTypes from 'prop-types'

import Theme from '../../style/theme'
import PageWrap from '../components/misc/PageWrap'
import HammerIOTextPng from '../assets/icons/hammer-io-uc-light.png'
import WrenchIcon from './../assets/icons/wrench.png'
import LaptopIcon from './../assets/icons/laptop.png'
import StartupIcon from './../assets/icons/startup.png'

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
  hammerIOTextImg: {
    maxWidth: 300
  },
  bannerImg: {
    backgroundImage: 'url("http://aag.aero/wp-content/uploads/2015/05/placeholder-banner-emerald.png")',
    height: 300,
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
  },
  card: {
    minWidth: 200,
    maxWidth: 300,
    marginBottom: 48
  },
  spacedText: {
    lineHeight: 1.5
  },
  lowerHeading: {
    textAlign: 'center',
    marginTop: 48,
    marginBottom: 12
  },
  lowerTextPortion: {
    lineHeight: 2,
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 36
  },
  hidden: {
    visibility: 'hidden'
  }
}

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.onClickGetStarted = this.onClickGetStarted.bind(this)
  }

  onClickGetStarted() {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <div style={styles.bannerImg}>
          <div style={styles.bannerTxt}>
            <h1 style={styles.hidden}>HammerIO</h1>
            <img src={HammerIOTextPng} alt="Hammer-IO" style={styles.hammerIOTextImg} />
            <p>
              An online platform to build, deploy, and monitor microservice applications in Node.js.
            </p>
            <RaisedButton primary label="Get Started" onClick={this.onClickGetStarted} />
          </div>
        </div>
        <PageWrap>
          <div style={styles.container}>
            <Flexbox flexWrap="wrap" justifyContent="space-evenly">

              <Flexbox>
                <Card style={styles.card}>
                  <CardMedia
                    overlay={<CardTitle title="Build" subtitle="Build microservice applications with ease" />}
                    mediaStyle={{ backgroundColor: Theme.colors.accent_u2 }}
                  >
                    <img src={WrenchIcon} alt="build" style={{ backgroundColor: Theme.colors.accent }} />
                  </CardMedia>
                  <CardText style={styles.spacedText}>
                    With the touch of a button and a short questionnaire, a new project is generated
                    with the entire DevOps pipeline setup and ready to go. We&#39;ve chosen some of
                    the most popular tools for Node.js development to start you off with, and more
                    tooling choices will continue to be added to the platform as it matures.
                  </CardText>
                </Card>
              </Flexbox>

              <Flexbox>
                <Card style={styles.card}>
                  <CardMedia
                    overlay={<CardTitle title="Deploy" subtitle="Deploy applications to the cloud instantly" />}
                    mediaStyle={{ backgroundColor: Theme.colors.cyan600 }}
                  >
                    <img src={StartupIcon} alt="deploy" style={{ backgroundColor: Theme.colors.cyan300 }} />
                  </CardMedia>
                  <CardText style={styles.spacedText}>
                    By removing the hassle of setting up the DevOps pipeline, you can start work
                    developing your application right away. After creating a new project, push
                    your code changes to the source repository and watch your test suites begin
                    running automatically in the continuous integration environment. Once the
                    tests have passed and the code is merged to master, the application is
                    packaged and deployed to the cloud seamlessly.
                  </CardText>
                </Card>
              </Flexbox>

              <Flexbox>
                <Card style={styles.card}>
                  <CardMedia
                    overlay={<CardTitle title="Monitor" subtitle="See realtime statistics on deployed services" />}
                    mediaStyle={{ backgroundColor: Theme.colors.primary_u2 }}
                  >
                    <img src={LaptopIcon} alt="monitor" style={{ backgroundColor: Theme.colors.primary }} />
                  </CardMedia>
                  <CardText style={styles.spacedText}>
                    Get useful statistics about your application from the monitoring dashboard.
                    Application uptime, OS usage information, and HTTP request data are just a
                    few of the things aggregated and visualized so you can stay ahead of potential
                    issues before they become major problems.
                  </CardText>
                </Card>
              </Flexbox>

            </Flexbox>
            <Divider />
            <h2 style={styles.lowerHeading}>Humble Beginnings</h2>
            <div style={styles.lowerTextPortion}>
              <p>
                Hammer-IO was started as a senior design project at Iowa State University
                in the fall semester of 2017. The problem we set out to solve is that
                the development and deployment of microservice applications to the cloud is
                a complex process that requires significant resources and domain expertise.
                Students and small startups with limited knowledge, resources, or time are faced
                with a significant barrier when beginning a microservice application.
              </p>
              <p>
                Our solution is to provide a DevOps framework offering an opinionated approach
                to developing and managing microservice applications in Node.js. You can find
                out more by visiting the development website.
              </p>
            </div>
            <RaisedButton
              label="Learn More"
              containerElement={<Link to="https://hammer-io.github.io/" target="_blank" />}
              primary
              style={styles.button}
            />
          </div>
        </PageWrap>
      </div>
    )
  }
}

LandingPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default LandingPage
