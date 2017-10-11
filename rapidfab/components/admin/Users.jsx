import React from 'react';
import PropTypes from 'prop-types';

import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

const Users = ({ users }) => (
  <ListGroup>
    { users.map(user =>
      <ListGroupItem>
        {user.name}
      </ListGroupItem>
    )}
  </ListGroup>
);

Users.propTypes = { users: PropTypes.arrayOf(PropTypes.object).isRequired };

export default Users;
