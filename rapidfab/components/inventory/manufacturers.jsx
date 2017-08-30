import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Error from 'rapidfab/components/error';
import Loading from 'rapidfab/components/Loading';

export const ContactColumn = ({ data }) =>
  <div>
    <h5>
      {data.name}
    </h5>
    <p>
      {data.phone}
    </p>
  </div>;

const ManufacturersGrid = ({ records }) =>
  <Grid
    data={records}
    columns={['id', 'name', 'address', 'contact', 'support']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('manufacturer'),
        locked: true,
      },
      {
        columnName: 'address',
        displayName: (
          <FormattedMessage id="field.address" defaultMessage="Address" />
        ),
      },
      {
        columnName: 'contact',
        displayName: (
          <FormattedMessage
            id="field.commercialContact"
            defaultMessage="Commercial Contact"
          />
        ),
        customComponent: ContactColumn,
      },
      {
        columnName: 'support',
        displayName: (
          <FormattedMessage
            id="field.supportContact"
            defaultMessage="Support Contact"
          />
        ),
        customComponent: ContactColumn,
      },
    ]}
  />;

const Manufacturers = ({ manufacturers, fetching, apiErrors }) =>
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['manufacturers']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/manufacturer"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.manufacturer.add"
            defaultMessage="Add Manufacturer"
          />
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
        {fetching ? <Loading /> : <ManufacturersGrid records={manufacturers} />}
      </BS.Col>
    </BS.Row>
  </BS.Grid>;

export default Manufacturers;
