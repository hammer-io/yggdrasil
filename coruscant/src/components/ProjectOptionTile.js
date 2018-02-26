import React from 'react'
import { Paper, RaisedButton } from 'material-ui'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import CheckIcon from 'material-ui/svg-icons/action/check-circle'
import NoneIcon from 'material-ui/svg-icons/content/remove-circle-outline'
import PropTypes from 'prop-types'
import TravisIcon from './svg/TravisLogo'
import MochaIcon from './svg/MochaLogo'
import DockerIcon from './svg/DockerLogo'
import GithubIcon from './svg/GithubLogo'
import HerokuIcon from './svg/HerokuLogo'
import SequelizeIcon from './svg/SequelizeLogo'
import ExpressIcon from './svg/ExpressLogo'
import Theme from './../../style/theme'

const styles = {
  button: {
    height: '150px',
    width: '150px'
  },
  overlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px',
    width: '150px'
  },
  icon: {
    height: '50px',
    width: '50px',
    marginLeft: '0px'
  },
  label: {
    paddingTop: '20px',
    fontWeight: Theme.font.weight.heavy
  }
}

const getButtonStyle = (selected) => {
  if (selected) {
    return {
      ...styles.button,
      backgroundColor: Theme.colors.grey300
    }
  }
  return styles.button
}

const getLabelStyle = (selected) => {
  if (selected) {
    return {
      ...styles.label,
      color: Theme.colors.grey600
    }
  }
  return styles.label
}


const getIcon = (option, disabled, selected) => {
  if (disabled) {
    return <WarningIcon style={styles.icon} color={Theme.colors.grey500} />
  } else if (selected) {
    return <CheckIcon style={styles.icon} color={Theme.colors.grey600} />
  }

  switch (option) {
    case 'github':
      return <GithubIcon style={styles.icon} />
    case 'travis':
      return <TravisIcon style={styles.icon} />
    case 'docker':
      return <DockerIcon style={styles.icon} />
    case 'heroku':
      return <HerokuIcon style={styles.icon} />
    case 'express':
      return <ExpressIcon style={styles.icon} />
    case 'sequelize':
      return <SequelizeIcon style={styles.icon} />
    case 'mocha':
      return <MochaIcon style={styles.icon} />
    case 'none':
      return <NoneIcon style={styles.icon} />
    default:
      return null
  }
}

const ProjectOptionTile = ({
  option,
  onClick,
  selected,
  disabled
}) => (
  <RaisedButton
    label={option}
    buttonStyle={getButtonStyle(selected)}
    overlayStyle={styles.overlay}
    labelStyle={getLabelStyle(selected)}
    icon={getIcon(option, disabled, selected)}
    onClick={onClick}
    disabled={disabled}
  />
)

ProjectOptionTile.defaultProps = {
  disabled: false
}

ProjectOptionTile.propTypes = {
  option: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  disabled: PropTypes.bool
}

export default ProjectOptionTile
