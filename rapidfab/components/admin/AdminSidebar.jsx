import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome'
import { Button } from 'react-bootstrap';

import UserContainer from 'rapidfab/containers/admin/UserContainer';

import AddUser from './AddUser';

const isUuid = (string) => (
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(string)
);

const AdminSidebar = ({ handleSelectionChange, selection }) => (
  <div>
    { selection !== 'none' &&
      <Button onClick={() => handleSelectionChange('none')}>
        <Fa name="arrow-left" />
      </Button>
    }
    { selection === 'add' && <AddUser handleSelectionChange={handleSelectionChange} /> }
    { isUuid(selection) && <UserContainer uuid={selection}/> }
  </div>
);

AdminSidebar.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
  selection: PropTypes.string.isRequired
};

export default AdminSidebar;
