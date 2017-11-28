import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';
import { MODELER_STATUS_MAP } from 'rapidfab/constants';
import Grid, { IdColumn, StatusColumn } from 'rapidfab/components/grid';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Loading from 'rapidfab/components/Loading';

const PrintersGrid = ({ printers, locations, printerTypes, modelers }) => (
  <Grid
    data={printers}
    columns={['id', 'modeler', 'name', 'location', 'printer_type']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('printer'),
        locked: true,
      },
      {
        columnName: 'name',
        displayName: <FormattedMessage id="field.name" defaultMessage="Name" />,
      },
      {
        displayName: <FormattedMessage id="field.type" defaultMessage="Type" />,
        columnName: 'printer_type',
        customComponent: IdColumn(
          'printer-type',
          'printer_type',
          printerTypes,
          'name'
        ),
      },
      {
        displayName: (
          <FormattedMessage id="field.location" defaultMessage="Location" />
        ),
        columnName: 'location',
        customComponent: IdColumn('location', 'location', locations, 'name'),
      },
      {
        displayName: (
          <FormattedMessage id="field.status" defaultMessage="Status" />
        ),
        columnName: 'modeler',
        customComponent: StatusColumn('modeler', modelers, MODELER_STATUS_MAP),
      },
    ]}
  />
);

PrintersGrid.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelers: PropTypes.arrayOf(PropTypes.object).isRequired,
  printers: PropTypes.arrayOf(PropTypes.object).isRequired,
  printerTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Printers = ({
  printers,
  locations,
  printerTypes,
  modelers,
  fetching,
  apiErrors,
}) => (
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['printers']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/printer"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.printer.add"
            defaultMessage="Add Printer"
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
        {fetching ? (
          <Loading />
        ) : (
          <PrintersGrid
            printers={printers}
            locations={locations}
            printerTypes={printerTypes}
            modelers={modelers}
          />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

Printers.propTypes = {
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  modelers: PropTypes.arrayOf(PropTypes.object).isRequired,
  printers: PropTypes.arrayOf(PropTypes.object).isRequired,
  printerTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Printers;
