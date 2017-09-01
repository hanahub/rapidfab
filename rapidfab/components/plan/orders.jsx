import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';
import Locations from 'rapidfab/components/locations';
import { ORDER_STATUS_MAP } from 'rapidfab/mappings';
import Grid, {
  DateTimeColumn,
  IdColumn,
  MappedColumn,
} from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';
import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';

const Orders = ({
  orders,
  locations,
  locationFilter,
  handleOnChange,
  fetching,
  apiErrors,
}) => (
  <BS.Grid fluid>
    <BreadcrumbNav breadcrumbs={['orders']} />

    <BS.Row>
      <BS.Col xs={8}>
        {locations.length > 1 ? (
          <Locations
            locations={locations}
            handleOnChange={handleOnChange}
            locationFilter={locationFilter}
          />
        ) : (
          <div />
        )}
      </BS.Col>
      <BS.Col xs={4}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/order"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage id="record.order.add" defaultMessage="Add Order" />
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
          <Grid
            data={orders}
            columns={['id', 'name', 'status', 'created']}
            columnMeta={[
              {
                displayName: (
                  <FormattedMessage id="field.id" defaultMessage="Id" />
                ),
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
                  <FormattedMessage
                    id="field.created"
                    defaultMessage="Created"
                  />
                ),
              },
            ]}
            initialSort="created"
            initialSortAscending={false}
          />
        )}
      </BS.Col>
    </BS.Row>
  </BS.Grid>
);

export default Orders;
