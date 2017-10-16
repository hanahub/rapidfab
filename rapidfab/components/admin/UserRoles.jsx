import React from 'react';
import PropTypes from 'prop-types';

import { FormControl, FormGroup, InputGroup, Label } from 'react-bootstrap';

import { FormattedMessage } from 'rapidfab/i18n';

const roles = ['manager', 'global-user', 'restricted'];

const styles = {
  spacingVertical: { padding: '2rem 0' },
  spacingBottom: { marginBottom: '0.5rem' },
};

const UserRoles = ({
  handleToggle,
  isSessionManager,
  userRoles,
  locations,
}) => (
  <FormGroup style={styles.spacingVertical}>
    <div style={styles.spacingBottom}>
      <Label>
        <FormattedMessage id="roles" defaultMessage="Roles" />
      </Label>
    </div>
    {roles.map(role => (
      <InputGroup key={role} style={styles.spacingBottom}>
        <InputGroup.Addon>
          <input
            checked={userRoles.includes(role)}
            disabled={!isSessionManager}
            name={role}
            onChange={handleToggle}
            type="checkbox"
          />
        </InputGroup.Addon>
        <FormControl type="text" value={role} disabled />
      </InputGroup>
    ))}
    {locations.map(location => (
      <InputGroup key={location.uri} style={styles.spacingBottom}>
        <InputGroup.Addon>
          <input
            checked={userRoles.includes(location.uri)}
            disabled={!isSessionManager}
            data-location={location.uri}
            name="location-user"
            onChange={handleToggle}
            type="checkbox"
          />
        </InputGroup.Addon>
        <FormControl
          type="text"
          value={`Location: ${location.name}`}
          disabled
        />
      </InputGroup>
    ))}
  </FormGroup>
);

UserRoles.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  isSessionManager: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UserRoles;
