import React from 'react';
import PropTypes from 'prop-types';

import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

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
    <FormGroup>
      <Button type="submit">{isEditing ? 'Edit User' : 'Create User'}</Button>
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
