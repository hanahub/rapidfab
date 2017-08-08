import React, { PropTypes } from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Error from 'rapidfab/components/error';

const UsersGrid = ({ records }) => (
  <Grid
    data={records}
    columns={[
      'id',
      'username',
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
      columnName: 'id',
      customComponent: IdColumn('user'),
      locked: true,
    }, {
      columnName: 'username',
      displayName: <FormattedMessage id="field.username" defaultMessage="Username" />,
    }]}
  />
);

const Loading = () => (
  <div style={{ textAlign: 'center' }}>
    <Fa name="spinner" spin size="2x" />
  </div>
);

const Users = ({ records, fetching, apiErrors }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active>
            <Fa name="list" /> <FormattedMessage id="inventory" defaultMessage="Inventory" />
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/users">
            <Fa name="users" /> <FormattedMessage id="inventory.users" defaultMessage="Users" />
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/user" className="pull-right">
          <Fa name="plus" /> <FormattedMessage id="record.user.add" defaultMessage="Add User" />
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr />

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors} />
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading /> : <UsersGrid records={records} />}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Users;
