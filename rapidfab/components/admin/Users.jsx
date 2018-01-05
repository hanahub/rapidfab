import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Users = ({ users, handleSelectionChange }) => (
  <ListGroup>
    {users.map(user => (
      <ListGroupItem
        className="clearfix"
        key={user.uuid}
        onClick={() => handleSelectionChange(user.uuid)}
      >
        <Fa className="pull-left" name="user" size="2x" />
        <span className="pull-right">{user.name || user.username}</span>
      </ListGroupItem>
    ))}
  </ListGroup>
);

Users.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      uuid: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Users;
