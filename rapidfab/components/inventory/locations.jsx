import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Grid, { IdColumn } from 'rapidfab/components/grid';
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
  return <span>{record.username}</span>;
};

ContactColumn.propTypes = {
  rowData: PropTypes.shape({
    phone: PropTypes.string,
  }).isRequired,
  metadata: PropTypes.shape({}).isRequired,
};

export const PhoneColumn = ({ rowData }) => {
  if (!rowData.phone) {
    return (
      <span>
        <FormattedMessage id="notAvailable" defaultMessage="N/A" />
      </span>
    );
  }
  return <span>{rowData.phone}</span>;
};

PhoneColumn.propTypes = {
  rowData: PropTypes.shape({
    phone: PropTypes.string,
  }).isRequired,
};

const LocationsGrid = ({ locations, users }) => (
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
  />
);

LocationsGrid.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Locations = ({ locations, users, fetching }) => (
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

    <FlashMessages />

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? (
          <Loading />
        ) : (
          <LocationsGrid locations={locations} users={users} />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

Locations.propTypes = {
  fetching: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Locations;
