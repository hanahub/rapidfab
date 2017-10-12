import React from 'react';
import PropTypes from 'prop-types';

const UserRoles = ({ userRoles }) => (
  <div>
    { userRoles.map(role =>
      <p key={role.uri}>
        {role.role}
      </p>
    )}
  </div>
);

UserRoles.propTypes = {
  userRoles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserRoles;
