import React from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonGroup } from 'react-bootstrap';

import UserRolesContainer from 'rapidfab/containers/admin/UserRolesContainer';
import UserFormContainer from 'rapidfab/containers/admin/UserFormContainer';

const User = ({
  handleDeleteUser,
  handleSelectionChange,
  handleViewChange,
  isSessionManager,
  isSessionUser,
  user,
  view,
}) => (
  <div>
    <h2>{user.name}</h2>
    {view === 'main' && (
      <div>
        <span>{user.emails[0]}</span>
        <UserRolesContainer user={user} />
        <ButtonGroup vertical block>
          <Button
            disabled={!isSessionManager && !isSessionUser}
            onClick={() => handleViewChange('edit')}
          >
            Edit User
          </Button>
          {/* <Button onClick={() => handleViewChange('delete')}>Delete User</Button> */}
        </ButtonGroup>
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
        <ButtonGroup vertical block>
          <Button onClick={() => handleViewChange('main')}>Back</Button>
        </ButtonGroup>
      </div>
    )}
  </div>
);

User.propTypes = {
  view: PropTypes.string.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  handleViewChange: PropTypes.func.isRequired,
  isSessionManager: PropTypes.bool.isRequired,
  isSessionUser: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default User;
