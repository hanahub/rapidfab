import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'rapidfab/i18n';
import UserFormContainer from 'rapidfab/containers/admin/UserFormContainer';

const AddUser = ({ handleSelectionChange }) => (
  <div>
    <h2>
      <FormattedMessage id="createNewUser" defaultMessage="Create new User" />
    </h2>
    <UserFormContainer handleSelectionChange={handleSelectionChange} />
  </div>
);

AddUser.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
};

export default AddUser;
