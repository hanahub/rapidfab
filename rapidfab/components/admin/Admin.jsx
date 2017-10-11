import React from 'react';
import PropTypes from 'prop-types';

import Fa from 'react-fontawesome'
import {
  Button,
  Col,
  Grid,
  PageHeader,
  Row,
  Well,
} from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import UsersContainer from 'rapidfab/containers/admin/UsersContainer';

const buttonRow ={
  display: 'flex',
  flexDirection: 'row-reverse',
  margin: '1rem 0 2rem 0',
};

const Admin = ({ selection, handleSelectionChange }) => (
  <Grid>
    <BreadcrumbNav breadcrumbs={["Admin"]} />

    <PageHeader>
      User Administration
    </PageHeader>

    <div style={buttonRow}>
      <Button onClick={() => handleSelectionChange('new')}>
        Add New User
      </Button>
    </div>

    <Row>
      <Col xs={12} sm={6}>
        <UsersContainer
          selection={selection}
          handleSelectionChange={handleSelectionChange}
        />
      </Col>
      <Col xs={12} sm={6}>
        { selection !== 'none' &&
          <Button onClick={() => handleSelectionChange('none')}>
            <Fa name="arrow-left" />
          </Button>
        }
        { selection }
      </Col>
    </Row>
  </Grid>
);

Admin.PropTypes = {
  selection: PropTypes.string.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
};

export default Admin;
