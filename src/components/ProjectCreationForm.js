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
  nameOnChange,
  descriptionOnChange,
  authorOnChange
}) => (
  <div style={styles.container}>
    <TextField
      hintText="Project Name"
      floatingLabelText="Project Name"
      errorText=""
      onChange={nameOnChange}
    />
    <TextField
      hintText="Project Description"
      floatingLabelText="Project Description"
      errorText=""
      onChange={descriptionOnChange}
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
      errorText=""
      onChange={authorOnChange}
    />
  </div>
)

ProjectCreationForm.propTypes = {
  handleDropDownChange: PropTypes.func.isRequired,
  dropDownValue: PropTypes.number.isRequired,
  nameOnChange: PropTypes.func.isRequired,
  authorOnChange: PropTypes.func.isRequired,
  descriptionOnChange: PropTypes.func.isRequired
}

export default ProjectCreationForm
