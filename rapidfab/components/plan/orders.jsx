import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { ORDER_STATUS_MAP } from 'rapidfab/mappings';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Griddle, {
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
        columns={[
          'id',
          'name',
          'status',
          'created',
          'customer_name',
          'due_date',
        ]}
        columnMeta={[
          {
            displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
            columnName: 'id',
            customComponent: IdColumn('order'),
            locked: true,
          },
          {
            columnName: 'name',
            displayName: (
              <FormattedMessage id="field.name" defaultMessage="Name" />
            ),
          },
          {
            customComponent: MappedColumn('status', ORDER_STATUS_MAP),
            columnName: 'status',
            displayName: (
              <FormattedMessage id="field.status" defaultMessage="Status" />
            ),
          },
          {
            customComponent: DateTimeColumn,
            columnName: 'created',
            displayName: (
              <FormattedMessage id="field.created" defaultMessage="Created" />
            ),
          },
          {
            columnName: 'customer_name',
            displayName: (
              <FormattedMessage
                id="field.customer_name"
                defaultMessage="Customer Name"
              />
            ),
          },
          {
            customComponent: DateTimeColumn,
            columnName: 'due_date',
            displayName: (
              <FormattedMessage id="field.due_date" defaultMessage="Due Date" />
            ),
          },
        ]}
        initialSort="created"
        initialSortAscending={false}
      />
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
