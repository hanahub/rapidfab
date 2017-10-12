import React from 'react';
import PropTypes from 'prop-types';

const UserRoles = ({
  handleToggle,
  isManager
}) => (
  <div>
    <input
      name="manager"
      checked={isManager}
      onChange={handleToggle}
      type="checkbox"
    />
    <span> Manager</span>
  </div>
);

UserRoles.propTypes = {
  isManager: PropTypes.bool.isRequired,
};

export default UserRoles;
