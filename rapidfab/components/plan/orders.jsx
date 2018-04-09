import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { ORDER_STATUS_MAP } from 'rapidfab/mappings';

import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins,
} from 'griddle-react';
import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import {
  DateTimeColumn,
  IdColumn,
  MappedColumn,
} from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';
import Locations from 'rapidfab/components/locations';
import OrderReportContainer from 'rapidfab/containers/OrderReportContainer';

const Orders = ({
  orders,
  locations,
  locationFilter,
  handleOnChange,
  fetching,
}) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['orders']} />

    <Row>
      <Col xs={8}>
        {locations.length > 1 && (
          <Locations
            locations={locations}
            handleOnChange={handleOnChange}
            locationFilter={locationFilter}
          />
        )}
      </Col>
      <Col xs={4}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button bsStyle="primary" bsSize="small" href="#/records/order">
            <Fa name="plus" />{' '}
            <FormattedMessage
              id="record.order.add"
              defaultMessage="Add Order"
            />
          </Button>
          <div style={{ marginRight: '1rem' }}>
            <OrderReportContainer />
          </div>
        </div>
      </Col>
    </Row>

    <hr />

    <FlashMessages />

    {fetching ? (
      <Loading />
    ) : (
      <Griddle
        data={orders}
        plugins={[plugins.LocalPlugin]}
        sortProperties={[{ id: 'created', sortAscending: true }]}
      >
        <RowDefinition>
          <ColumnDefinition id="name" title="Name" />
          <ColumnDefinition
            id="id"
            title="Id"
            customComponent={IdColumn('order')}
          />
          <ColumnDefinition
            id="status"
            title="Status"
            customComponent={({ value }) => (
              <MappedColumn mapping={ORDER_STATUS_MAP} value={value} />
            )}
          />
          <ColumnDefinition
            id="created"
            title="Created"
            customComponent={DateTimeColumn}
          />
          <ColumnDefinition id="customer_name" title="Customer Name" />
          <ColumnDefinition
            id="due_date"
            title="Due Date"
            customComponent={DateTimeColumn}
          />
        </RowDefinition>
      </Griddle>
      // <Griddle
      //   initialSort="created"
      //   initialSortAscending={false}
      //   showFilter
      // />
    )}
  </Grid>
);

Orders.propTypes = {
  fetching: PropTypes.bool.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  locationFilter: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Orders;
