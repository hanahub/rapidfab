import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Users = ({ users }) => (
  <ListGroup>
    { users.map(user =>
      <ListGroupItem className="clearfix" onClick={ () => ({})}>
        <Fa className="pull-left" name="user" size="2x" />
        <span className="pull-right">{user.name}</span>
      </ListGroupItem>
    )}
  </ListGroup>
);

Users.propTypes = { users: PropTypes.arrayOf(PropTypes.object).isRequired };

export default Users;
