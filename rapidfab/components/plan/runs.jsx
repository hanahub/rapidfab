import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';
import { RUN_OPERATION_MAP, RUN_STATUS_MAP } from 'rapidfab/mappings';
import Grid, {
  IdColumn,
  DateTimeColumn,
  MappedColumn,
} from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';
import Locations from 'rapidfab/components/locations';

const RunsGrid = ({ runs }) =>
  <Grid
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
  />;

const Runs = ({
  locationFilter,
  locations,
  runs,
  fetching,
  apiErrors,
  handleOnChange,
}) =>
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active>
            <Fa name="road" />{' '}
            <FormattedMessage id="plan" defaultMessage="Plan" />
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/plan/runs">
            <Fa name="list" />{' '}
            <FormattedMessage id="plan.runs" defaultMessage="Runs" />
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>
    <BS.Row>
      <BS.Col xs={8}>
        {locations.length > 1
          ? <Locations
              locations={locations}
              handleOnChange={handleOnChange}
              locationFilter={locationFilter}
            />
          : <div />}
      </BS.Col>
      <BS.Col xs={4}>
        <BS.Button
          bsStyle="primary"
          bsSize="small"
          href="#/records/run"
          className="pull-right"
        >
          <Fa name="plus" />{' '}
          <FormattedMessage id="record.run.add" defaultMessage="Add Run" />
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
        {fetching ? <Loading /> : <RunsGrid runs={runs} />}
      </BS.Col>
    </BS.Row>
  </BS.Grid>;

export default Runs;