import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome'
import { Button } from 'react-bootstrap';

import AddUser from './AddUser';

const AdminSidebar = ({ handleSelectionChange, selection }) => (
  <div>
    { selection !== 'none' &&
      <Button onClick={() => handleSelectionChange('none')}>
        <Fa name="arrow-left" />
      </Button>
    }
    { selection === 'add' && <AddUser /> }
  </div>
);

AdminSidebar.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
  selection: PropTypes.string.isRequired
};

export default AdminSidebar;
