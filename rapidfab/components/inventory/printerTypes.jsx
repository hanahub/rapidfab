import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Error from 'rapidfab/components/error';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';

const PrinterTypesGrid = ({ printerTypes, manufacturers }) =>
  <Grid
    data={printerTypes}
    columns={['id', 'name', 'type', 'manufacturer']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('printer-type'),
        locked: true,
      },
      {
        displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
        columnName: 'name',
      },
      {
        displayName: <FormattedMessage id="field.type" defaultMessage="Type" />,
        columnName: 'type',
      },
      {
        displayName: (
          <FormattedMessage
            id="field.manufacturer"
            defaultMessage="Manufacturer"
          />
        ),
        columnName: 'manufacturer',
        customComponent: IdColumn(
          'manufacturer',
          'manufacturer',
          manufacturers,
          'name'
        ),
      },
    ]}
  />;

const PrinterTypes = ({ printerTypes, manufacturers, fetching, apiErrors }) =>
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['printerTypes']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/printer-type"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.printerType.add"
            defaultMessage="Add Printer Type"
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
        {fetching
          ? <Loading />
          : <PrinterTypesGrid
              printerTypes={printerTypes}
              manufacturers={manufacturers}
            />}
      </BS.Col>
    </BS.Row>
  </BS.Grid>;

export default PrinterTypes;
