import React from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins,
} from 'griddle-react';

import griddleStyleConfig from 'rapidfab/components/griddle/griddleStyleConfig';
import { ORDER_STATUS_MAP } from 'rapidfab/mappings';
import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import CustomHeadingComponent from 'rapidfab/components/griddle/CustomHeadingComponent';
import DateTimeColumn from 'rapidfab/components/griddle/DateTimeColumn';
import FlashMessages from 'rapidfab/components/FlashMessages';
import { FormattedMessage } from 'react-intl';
import GriddleLayout from 'rapidfab/components/griddle/GriddleLayout';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import Loading from 'rapidfab/components/Loading';
import Locations from 'rapidfab/components/locations';
import MappedColumn from 'rapidfab/components/griddle/MappedColumn';
import OrderReportContainer from 'rapidfab/containers/OrderReportContainer';

const Orders = ({
  orders,
  locations,
  locationFilter,
  handleOnChange,
  fetching,
}) => (
  <Grid>
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
          <Button bsStyle="success" bsSize="small" href="#/records/order">
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
        components={{ Layout: GriddleLayout }}
        data={orders}
        pageProperties={{ pageSize: 50 }}
        plugins={[plugins.LocalPlugin]}
        sortProperties={[{ id: 'created', sortAscending: true }]}
        styleConfig={griddleStyleConfig}
      >
        <RowDefinition>
          <ColumnDefinition
            id="name"
            customHeadingComponent={props => (
              <CustomHeadingComponent
                {...props}
                id="field.name"
                defaultMessage="Name"
              />
            )}
          />
          <ColumnDefinition
            id="id"
            customComponent={props => (
              <IdColumn {...props} resource={'order'} />
            )}
            customHeadingComponent={props => (
              <CustomHeadingComponent
                {...props}
                id="field.id"
                defaultMessage="ID"
              />
            )}
          />
          <ColumnDefinition
            id="status"
            customComponent={({ value }) => (
              <MappedColumn mapping={ORDER_STATUS_MAP} value={value} />
            )}
            customHeadingComponent={props => (
              <CustomHeadingComponent
                {...props}
                id="field.status"
                defaultMessage="Status"
              />
            )}
          />
          <ColumnDefinition
            id="created"
            customComponent={DateTimeColumn}
            customHeadingComponent={props => (
              <CustomHeadingComponent
                {...props}
                id="field.created"
                defaultMessage="Created"
              />
            )}
          />
          <ColumnDefinition
            id="customer_name"
            customHeadingComponent={props => (
              <CustomHeadingComponent
                {...props}
                id="field.customer_name"
                defaultMessage="Customer Name"
              />
            )}
          />
          <ColumnDefinition
            id="due_date"
            customComponent={DateTimeColumn}
            customHeadingComponent={props => (
              <CustomHeadingComponent
                {...props}
                id="field.due_date"
                defaultMessage="Due Date"
              />
            )}
          />
        </RowDefinition>
      </Griddle>
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
