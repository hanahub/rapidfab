import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome';
import { Button } from 'react-bootstrap';

import isUuid from 'rapidfab/utils/isUuid';

import UserContainer from 'rapidfab/containers/admin/UserContainer';
import AddUser from './AddUser';

const styles = {
  border: {
    border: '1px solid rgb(67, 72, 87)',
    borderRadius: '4px',
    padding: '10px 15px',
  },
};

const AdminSidebar = ({ handleSelectionChange, selection }) => (
  <div style={selection !== 'none' ? styles.border : null}>
    {selection !== 'none' && (
      <Button onClick={() => handleSelectionChange('none')}>
        <Fa name="arrow-left" />
      </Button>
    )}
    {selection === 'add' && (
      <AddUser handleSelectionChange={handleSelectionChange} />
    )}
    {isUuid(selection) && (
      <UserContainer
        uuid={selection}
        handleSelectionChange={handleSelectionChange}
      />
    )}
  </div>
);

AdminSidebar.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
  selection: PropTypes.string.isRequired,
};

export default AdminSidebar;
