import React, { PropTypes }                   from "react";
import * as BS                                from 'react-bootstrap';
import Fa                                     from 'react-fontawesome';
import { FormattedMessage }                   from 'react-intl';
import Error                                  from 'rapidfab/components/error'
import { RUN_STATUS_MAP }                     from 'rapidfab/mappings'
import Grid, {
  IdColumn,
  CapitalizeColumn,
  DateTimeColumn,
  MappedColumn,
} from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';

const RunsGrid = ({ runs }) => (
  <Grid
    data={runs}
    columns={[
      "id",
      "status",
      "created"
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("run"),
      locked: true
    }, {
      columnName: "status",
      displayName: <FormattedMessage id="field.status" defaultMessage='Status'/>,
      customComponent: MappedColumn("status", RUN_STATUS_MAP),
    }, {
      customComponent: DateTimeColumn,
      columnName: "created",
      displayName: <FormattedMessage id="field.created" defaultMessage='Created'/>
    }]}
    initialSort="created"
    initialSortAscending={false}
  />
)

const Locations = ({ locationFilter, locations, handleOnChange }) => (
  <BS.FormControl onChange={e => {handleOnChange(e.target.value)}} value={locationFilter} componentClass="select">
    <option key="placeholder" value="" selected>All</option>
    {_.map(locations, location => (
      <option key={location.uri} value={location.uri}>{`${location.id} - ${location.name}`}</option>
    ))}
  </BS.FormControl>
);

const Runs = ({ locationFilter, locations, runs, fetching, apiErrors, handleOnChange }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active={true}>
            <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/plan/runs">
            <Fa name='list'/> <FormattedMessage id="plan.runs" defaultMessage='Runs'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>
    <BS.Row>
      <BS.Col xs={6}>
      </BS.Col>
      <BS.Col xs={4}>
        {locations.length > 1 ? <Locations
          locations={locations}
          handleOnChange={handleOnChange}
          locationFilter={locationFilter}
        /> : <div/>}
      </BS.Col>
      <BS.Col xs={2}>
        <BS.Button bsStyle="primary" bsSize="small" href="#/records/run" className="pull-right">
          <Fa name='plus'/> <FormattedMessage id="record.run.add" defaultMessage='Add Run'/>
        </BS.Button>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        <Error errors={apiErrors}/>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={12}>
        {fetching ? <Loading/> : <RunsGrid runs={runs}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

export default Runs
