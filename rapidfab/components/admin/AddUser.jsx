import React from 'react';
import PropTypes from 'prop-types';

import UserFormContainer from 'rapidfab/containers/admin/UserFormContainer';

const AddUser = ({ handleSelectionChange }) => (
  <div>
    <h2>Create New User</h2>
    <UserFormContainer handleSelectionChange={handleSelectionChange}/>
  </div>
);

AddUser.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
};

export default AddUser;
