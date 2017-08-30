import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Error from 'rapidfab/components/error';
import Loading from 'rapidfab/components/Loading';

export const ContactColumn = ({ rowData, metadata }) => {
  if (!rowData.contact) {
    return (
      <span>
        <FormattedMessage id="notAvailable" defaultMessage="N/A" />
      </span>
    );
  }

  const recordsByUri = _.keyBy(metadata.records, 'uri');
  const record = recordsByUri[rowData.contact];

  if (!record) {
    return <Fa name="spinner" spin />;
  }
  return (
    <span>
      {record.username}
    </span>
  );
};

export const PhoneColumn = ({ rowData }) => {
  if (!rowData.phone) {
    return (
      <span>
        <FormattedMessage id="notAvailable" defaultMessage="N/A" />
      </span>
    );
  }
  return (
    <span>
      {rowData.phone}
    </span>
  );
};

const LocationsGrid = ({ locations, users }) =>
  <Grid
    data={locations}
    columns={['id', 'name', 'address', 'contact', 'phone']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('location'),
        locked: true,
      },
      {
        columnName: 'name',
        displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
      },
      {
        columnName: 'address',
        displayName: (
          <FormattedMessage id="field.address" defaultMessage="Address" />
        ),
      },
      {
        columnName: 'phone',
        displayName: (
          <FormattedMessage id="field.phone" defaultMessage="Phone" />
        ),
        customComponent: PhoneColumn,
      },
      {
        columnName: 'contact',
        displayName: (
          <FormattedMessage id="field.contact" defaultMessage="contact" />
        ),
        customComponent: ContactColumn,
        records: users,
      },
    ]}
  />;

const Locations = ({ locations, users, fetching, apiErrors }) =>
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['locations']} />

    <div className="clearfix">
      <BS.Button
        bsStyle="primary"
        bsSize="small"
        href="#/records/location"
        className="pull-right"
      >
        <Fa name="plus" />{' '}
        <FormattedMessage
          id="record.location.add"
          defaultMessage="Add Location"
        />
      </BS.Button>
    </div>

    <hr />

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors} />
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching
          ? <Loading />
          : <LocationsGrid locations={locations} users={users} />}
      </BS.Col>
    </BS.Row>
  </BS.Grid>;

export default Locations;
