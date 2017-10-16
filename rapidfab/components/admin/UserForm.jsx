import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  ButtonGroup,
  ControlLabel,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

const styles = {
  paddingTop: { paddingTop: '1rem' },
};

const UserForm = ({
  isEditing,
  email,
  name,
  handleInputChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <FormGroup>
      <ControlLabel>Name</ControlLabel>
      <FormControl
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Email</ControlLabel>
      <FormControl
        type="text"
        name="email"
        value={email}
        onChange={handleInputChange}
      />
    </FormGroup>
    <FormGroup style={styles.paddingTop}>
      <ButtonGroup vertical block>
        <Button type="submit">{isEditing ? 'Edit User' : 'Create User'}</Button>
      </ButtonGroup>
    </FormGroup>
  </form>
);

UserForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default UserForm;
