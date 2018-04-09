import React from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonToolbar, Col, Panel, Grid, Row } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Griddle, { ColumnDefinition, RowDefinition } from 'griddle-react';

import { ORDER_STATUS_MAP } from 'rapidfab/mappings';

import {
  DateTimeColumn,
  IdColumn,
  MappedColumn,
} from 'rapidfab/components/grid';
import Chart, { SeriesStyle } from 'rapidfab/components/chart';
import Loading from 'rapidfab/components/Loading';
import Locations from 'rapidfab/components/locations';
import Error from 'rapidfab/components/error';

const LastTenOrders = ({ data }) => (
  <Griddle data={data}>
    <RowDefinition>
      <ColumnDefinition
        id="id"
        customComponent={IdColumn('order')}
        customHeadingComponent={() => (
          <FormattedMessage id="field.id" defaultMessage="Id" />
        )}
      />
      <ColumnDefinition
        id="name"
        customHeadingComponent={() => (
          <FormattedMessage id="field.name" defaultMessage="Name" />
        )}
      />
      <ColumnDefinition
        id="status"
        customComponent={({ value }) => (
          <MappedColumn mapping={ORDER_STATUS_MAP} value={value} />
        )}
        customHeadingComponent={() => (
          <FormattedMessage id="field.status" defaultMessage="Status" />
        )}
      />
      <ColumnDefinition
        id="created"
        customComponent={DateTimeColumn}
        customHeadingComponent={() => (
          <FormattedMessage id="field.created" defaultMessage="Created" />
        )}
      />
    </RowDefinition>
  </Griddle>
);

LastTenOrders.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const RunsByStatusChart = ({ data }) => {
  const datasets = [
    {
      label: 'Status',
      backgroundColor: [
        SeriesStyle.Warning.color,
        SeriesStyle.Info.color,
        SeriesStyle.Default.color,
        SeriesStyle.Danger.color,
        SeriesStyle.Success.color,
      ],
      hoverBackgroundColor: [
        SeriesStyle.Warning.hover,
        SeriesStyle.Info.hover,
        SeriesStyle.Default.hover,
        SeriesStyle.Danger.hover,
        SeriesStyle.Success.hover,
      ],
      data,
    },
  ];
  return (
    <Chart
      type="bar"
      data={{
        labels: [
          <FormattedMessage
            id="status.calculating"
            defaultMessage="Calculating"
          />,
          <FormattedMessage id="status.queued" defaultMessage="Queued" />,
          <FormattedMessage
            id="status.inProgress"
            defaultMessage="In Progress"
          />,
          <FormattedMessage id="status.error" defaultMessage="Error" />,
          <FormattedMessage id="status.complete" defaultMessage="Complete" />,
        ],
        datasets,
      }}
    />
  );
};

RunsByStatusChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.num).isRequired,
};

const Home = ({
  fetchingOrders,
  fetchingRuns,
  apiErrors,
  data,
  locationFilter,
  locations,
  handleOnChange,
}) => (
  <Grid fluid>
    <Row>
      <Col xs={8}>
        {locations.length > 1 ? (
          <Locations
            locations={locations}
            handleOnChange={handleOnChange}
            locationFilter={locationFilter}
          />
        ) : (
          <div />
        )}
      </Col>
      <Col xs={4}>
        <ButtonToolbar className="pull-right">
          <Button bsStyle="primary" bsSize="small" href="#/records/order">
            <Fa name="list" />{' '}
            <FormattedMessage
              id="record.order.add"
              defaultMessage="Add Order"
            />
          </Button>
          <Button bsStyle="primary" bsSize="small" href="#/records/run">
            <Fa name="files-o" />{' '}
            <FormattedMessage id="record.run.add" defaultMessage="Add Run" />
          </Button>
        </ButtonToolbar>
      </Col>
    </Row>

    <hr />

    <Row>
      <Col xs={12}>
        <Error errors={apiErrors} />
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <Panel header="Orders">
          {fetchingOrders ? (
            <Loading />
          ) : (
            <LastTenOrders data={data.lastTenOrders} />
          )}
        </Panel>
      </Col>
      <Col md={6}>
        <Panel header="Run Status">
          {fetchingRuns ? (
            <Loading />
          ) : (
            <RunsByStatusChart data={data.runStatus} />
          )}
        </Panel>
      </Col>
    </Row>
  </Grid>
);

Home.defaultProps = {
  locationFilter: null,
};

Home.propTypes = {
  data: PropTypes.shape({
    lastTenOrders: PropTypes.arrayOf(PropTypes.object),
    runStatus: PropTypes.arrayOf(PropTypes.num),
  }).isRequired,
  fetchingOrders: PropTypes.bool.isRequired,
  fetchingRuns: PropTypes.bool.isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
  locationFilter: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default Home;
