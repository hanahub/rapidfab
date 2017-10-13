import React from 'react';
import PropTypes from 'prop-types';

const roles = ['manager', 'global-user', 'restricted'];

const UserRoles = ({
  handleToggle,
  isSessionManager,
  userRoles,
  locations,
}) => (
  <div>
    {roles.map(role => (
      <div key={role}>
        <input
          checked={userRoles.includes(role)}
          disabled={!isSessionManager}
          name={role}
          onChange={handleToggle}
          type="checkbox"
        />
        <span> {role}</span>
      </div>
    ))}
    {locations.map(location => (
      <div key={location.uri}>
        <input
          checked={userRoles.includes(location.uri)}
          disabled={!isSessionManager}
          data-location={location.uri}
          name="location-user"
          onChange={handleToggle}
          type="checkbox"
        />
        <span> Location: {location.name}</span>
      </div>
    ))}
  </div>
);

UserRoles.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  isSessionManager: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserRoles;
