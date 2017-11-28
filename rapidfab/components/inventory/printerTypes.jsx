import React from 'react';
import PropTypes from 'prop-types';

import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Grid, { IdColumn } from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';

const PrinterTypes = ({ printerTypes, manufacturers, fetching }) => (
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

    <FlashMessages />

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? (
          <Loading />
        ) : (
          <Grid
            data={printerTypes}
            columns={['id', 'name', 'manufacturer']}
            columnMeta={[
              {
                displayName: (
                  <FormattedMessage id="field.id" defaultMessage="Id" />
                ),
                columnName: 'id',
                customComponent: IdColumn('printer-type'),
                locked: true,
              },
              {
                displayName: (
                  <FormattedMessage id="field.name" defaultMessage="Name" />
                ),
                columnName: 'name',
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
          />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

PrinterTypes.propTypes = {
  printerTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  manufacturers: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default PrinterTypes;
