import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  PageHeader,
  ListGroup,
  ListGroupItem,
  Panel,
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import { FormattedMessage } from 'rapidfab/i18n';

const Admin = ({ bureauName }) => (
  <Grid>
    <BreadcrumbNav breadcrumbs={['admin']} />
    <FlashMessages />

    <PageHeader>
      <FormattedMessage
        id="Bureau Administration"
        defaultMessage="Bureau Administration"
      />
    </PageHeader>

    <Panel header={bureauName}>
      <ListGroup fill>
        <ListGroupItem href="#/admin/users">
          <FontAwesome name="users" />
          {` `}
          Users
        </ListGroupItem>
      </ListGroup>
    </Panel>
  </Grid>
);

Admin.propTypes = { bureauName: PropTypes.string.isRequired };

export default Admin;
