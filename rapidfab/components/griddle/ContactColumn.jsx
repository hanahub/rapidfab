import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ContactColumn = ({ value, users }) => (
  <span>
    {users[value] ? (
      users[value].username
    ) : (
      <FormattedMessage id="notAvailable" defaultMessage="N/A" />
    )}
  </span>
);

ContactColumn.defaultProps = { users: {} };

ContactColumn.propTypes = {
  value: PropTypes.string.isRequired,
  users: PropTypes.shape({}),
};

export default ContactColumn;
