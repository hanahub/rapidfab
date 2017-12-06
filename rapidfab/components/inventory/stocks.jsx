import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';
import Grid, {
  IdColumn,
  CapitalizeColumn,
  NumberColumn,
} from 'rapidfab/components/grid';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';

const StocksGrid = ({ stocks, materials, locations }) => (
  <Grid
    data={stocks}
    columns={['id', 'material', 'location', 'status', 'quantity', 'units']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('stock'),
        locked: true,
      },
      {
        columnName: 'material',
        customComponent: IdColumn('material', 'material', materials, 'name'),
        displayName: (
          <FormattedMessage id="field.material" defaultMessage="Material" />
        ),
      },
      {
        columnName: 'location',
        customComponent: IdColumn('location', 'location', locations, 'name'),
        displayName: (
          <FormattedMessage id="field.location" defaultMessage="Location" />
        ),
      },
      {
        columnName: 'status',
        customComponent: CapitalizeColumn,
        displayName: (
          <FormattedMessage id="field.status" defaultMessage="Status" />
        ),
      },
      {
        columnName: 'quantity',
        customComponent: NumberColumn,
        displayName: (
          <FormattedMessage id="field.quantity" defaultMessage="Quantity" />
        ),
      },
      {
        columnName: 'units',
        customComponent: CapitalizeColumn,
        displayName: (
          <FormattedMessage id="field.units" defaultMessage="Units" />
        ),
      },
    ]}
  />
);

StocksGrid.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  stocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Stocks = ({ stocks, materials, locations, fetching }) => (
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['materialStocks']} />

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/stock"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage
            id="record.materialStock.add"
            defaultMessage="Add Material Stock"
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
          <StocksGrid
            stocks={stocks}
            materials={materials}
            locations={locations}
          />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

Stocks.propTypes = {
  fetching: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  stocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Stocks;
