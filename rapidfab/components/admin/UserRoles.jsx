import React from 'react';
import PropTypes from 'prop-types';

const roles = [
  'manager',
  'global-user',
  'restricted',
];

const UserRoles = ({
  handleToggle,
  userRoles,
  locations,
}) => (
  <div>
    { roles.map(role =>
        <div key={role}>
          <input
            checked={userRoles.includes(role)}
            name={role}
            onChange={handleToggle}
            type="checkbox"
          />
          <span> {role}</span>
        </div>
    )}
    { locations.map(location =>
        <div key={location.uri}>
          <input
            checked={userRoles.includes(location.uri)}
            data-location={location.uri}
            name="location-user"
            onChange={handleToggle}
            type="checkbox"
          />
          <span> Location: {location.name}</span>
        </div>
    )}
  </div>
);

UserRoles.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  userRoles: PropTypes.arrayOf(PropTypes.string),
};

export default UserRoles;
