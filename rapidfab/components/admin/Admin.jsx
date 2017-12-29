import React from 'react';

import { Grid, PageHeader } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import { FormattedMessage } from 'rapidfab/i18n';

const Admin = () => (
  <Grid>
    <BreadcrumbNav breadcrumbs={['admin']} />
    <FlashMessages />

    <PageHeader>
      <FormattedMessage
        id="Bureau Administration"
        defaultMessage="Bureau Administration"
      />
    </PageHeader>

    <a href="#/admin/users">Users</a>
  </Grid>
);

export default Admin;
