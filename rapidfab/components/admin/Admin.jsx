import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Grid, PageHeader, Row } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import { FormattedMessage } from 'rapidfab/i18n';
import UsersContainer from 'rapidfab/containers/admin/UsersContainer';

import AdminSidebar from './AdminSidebar';

const styles = {
  buttonRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '1rem 0 2rem 0',
  },
};

const Admin = ({ selection, handleSelectionChange, isSessionManager }) => (
  <Grid>
    <BreadcrumbNav breadcrumbs={['Admin']} />
    <FlashMessages />

    <PageHeader>
      <FormattedMessage
        id="userAdministration"
        defaultMessage="User Administration"
      />
    </PageHeader>

    <div style={styles.buttonRow}>
      <Button
        disabled={!isSessionManager}
        onClick={() => handleSelectionChange('add')}
      >
        <FormattedMessage id="addNewUser" defaultMessage="Add New User" />
      </Button>
    </div>

    <h3>
      <FormattedMessage id="users" defaultMessage="Users" />
    </h3>
    <Row>
      <Col xs={12} sm={6}>
        <UsersContainer handleSelectionChange={handleSelectionChange} />
      </Col>
      <Col xs={12} sm={6}>
        <AdminSidebar
          handleSelectionChange={handleSelectionChange}
          selection={selection}
        />
      </Col>
    </Row>
  </Grid>
);

Admin.propTypes = {
  selection: PropTypes.string.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  isSessionManager: PropTypes.bool.isRequired,
};

export default Admin;
