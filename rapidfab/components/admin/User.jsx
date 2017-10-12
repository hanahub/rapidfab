import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import UserRolesContainer from 'rapidfab/containers/admin/UserRolesContainer';
import UserFormContainer from 'rapidfab/containers/admin/UserFormContainer';

const User = ({
  handleDeleteUser,
  handleSelectionChange,
  handleViewChange,
  user,
  view,
}) => (
  <div>
    <h2>{user.name}</h2>
    {view === 'main' && (
      <div>
        <UserRolesContainer user={user} />
        <Button onClick={() => handleViewChange('edit')}>Edit User</Button>
        <Button onClick={() => handleViewChange('delete')}>Delete User</Button>
      </div>
    )}
    {view === 'delete' && (
      <div>
        <p>Really delete?</p>
        <Button onClick={handleDeleteUser}>Yes</Button>
        <Button onClick={() => handleViewChange('main')}>No</Button>
      </div>
    )}
    {view === 'edit' && (
      <div>
        <UserFormContainer
          handleSelectionChange={handleSelectionChange}
          user={user}
        />
        <Button onClick={() => handleViewChange('main')}>Back</Button>
      </div>
    )}
  </div>
);

User.propTypes = {
  view: PropTypes.string.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  handleViewChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default User;
