import React from 'react'
import { TextField, DropDownMenu, MenuItem } from 'material-ui'
import PropTypes from 'prop-types'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  dropDown: {
    width: '150px'
  },
  dropDownUnderline: {
    marginLeft: '0px'
  },
  dropDownLabel: {
    paddingLeft: '0px'
  }
}

const ProjectCreationForm = ({
  handleDropDownChange,
  dropDownValue,
  name,
  description,
  author,
  version,
  nameOnChange,
  descriptionOnChange,
  authorOnChange,
  versionOnChange,
  nameErrorText,
  descriptionErrorText,
  authorErrorText,
  versionErrorText
}) => (
  <div style={styles.container}>
    <TextField
      hintText="Project Name"
      floatingLabelText="Project Name"
      errorText={nameErrorText}
      onChange={nameOnChange}
      value={name}
    />
    <TextField
      hintText="Project Description"
      floatingLabelText="Project Description"
      errorText={descriptionErrorText}
      onChange={descriptionOnChange}
      value={description}
    />
    <DropDownMenu
      value={dropDownValue}
      style={styles.dropDown}
      underlineStyle={styles.dropDownUnderline}
      labelStyle={styles.dropDownLabel}
      onChange={handleDropDownChange}
    >
      <MenuItem value={1} primaryText="MIT" />
      <MenuItem value={2} primaryText="ISC" />
    </DropDownMenu>
    <TextField
      hintText="Author"
      floatingLabelText="Author"
      errorText={authorErrorText}
      onChange={authorOnChange}
      value={author}
    />
    <TextField
      hintText="Version"
      floatingLabelText="Version"
      errorText={versionErrorText}
      onChange={versionOnChange}
      value={version}
    />
  </div>
)

ProjectCreationForm.propTypes = {
  handleDropDownChange: PropTypes.func.isRequired,
  dropDownValue: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  nameOnChange: PropTypes.func.isRequired,
  authorOnChange: PropTypes.func.isRequired,
  descriptionOnChange: PropTypes.func.isRequired,
  versionOnChange: PropTypes.func.isRequired,
  nameErrorText: PropTypes.string.isRequired,
  descriptionErrorText: PropTypes.string.isRequired,
  authorErrorText: PropTypes.string.isRequired,
  versionErrorText: PropTypes.string.isRequired
}

export default ProjectCreationForm
