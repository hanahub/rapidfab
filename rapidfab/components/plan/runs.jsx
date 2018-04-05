import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Fa from 'react-fontawesome';
import { Button, Col, Grid, Row } from 'react-bootstrap';

import { RUN_OPERATION_MAP, RUN_STATUS_MAP } from 'rapidfab/mappings';
import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Griddle, {
  IdColumn,
  DateTimeColumn,
  MappedColumn,
} from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';
import Locations from 'rapidfab/components/locations';

const RunsGrid = ({ runs }) => (
  <Griddle
    data={runs}
    columns={['id', 'operation', 'status', 'created']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('run'),
        locked: true,
      },
      {
        columnName: 'operation',
        displayName: (
          <FormattedMessage id="field.operation" defaultMessage="Operation" />
        ),
        customComponent: MappedColumn('operation', RUN_OPERATION_MAP),
      },
      {
        columnName: 'status',
        displayName: (
          <FormattedMessage id="field.status" defaultMessage="Status" />
        ),
        customComponent: MappedColumn('status', RUN_STATUS_MAP),
      },
      {
        customComponent: DateTimeColumn,
        columnName: 'created',
        displayName: (
          <FormattedMessage id="field.created" defaultMessage="Created" />
        ),
      },
    ]}
    initialSort="created"
    initialSortAscending={false}
    showFilter
  />
);

RunsGrid.propTypes = {
  runs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Runs = ({
  locationFilter,
  locations,
  runs,
  fetching,
  handleOnChange,
}) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['runs']} />
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
        <Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/run"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage id="record.run.add" defaultMessage="Add Run" />
        </Button>
      </Col>
    </Row>

    <hr />

    <FlashMessages />

    <Row>
      <Col xs={12}>{fetching ? <Loading /> : <RunsGrid runs={runs} />}</Col>
    </Row>
  </Grid>
);

Runs.propTypes = {
  fetching: PropTypes.bool.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  locationFilter: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  runs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Runs;
