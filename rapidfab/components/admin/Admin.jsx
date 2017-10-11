import React from 'react';

import {
  Grid,
  PageHeader,
} from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import UsersContainer from 'rapidfab/containers/admin/UsersContainer';

const Admin = () => (
  <Grid>
    <BreadcrumbNav breadcrumbs={["Admin"]} />
    <PageHeader>
      User Administration
    </PageHeader>
    <UsersContainer />
  </Grid>
);

export default Admin;
