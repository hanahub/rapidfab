import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';


const User = ({ view, handleDeleteUser, handleViewChange, user }) => (
  <div>
    <h2>{user.name}</h2>
    { view === 'main' &&
        <Button onClick={() => handleViewChange('delete')}>
          Delete User
        </Button>
    }
    { view === 'delete' &&
        <div>
          <p>Really delete?</p>
          <Button onClick={handleDeleteUser}>
            Yes
          </Button>
          <Button onClick={() => handleViewChange('main')}>
            No
          </Button>
        </div>
    }
  </div>
);

User.propTypes = {
  view: PropTypes.string.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  handleViewChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default User;
