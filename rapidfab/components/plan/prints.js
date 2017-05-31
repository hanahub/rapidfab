import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import Error from 'rapidfab/components/error';
import Grid, { IdColumn, MappedColumn } from 'rapidfab/components/grid';
import Locations from 'rapidfab/components/locations';
import Loading from 'rapidfab/components/loading';

import { PRINT_STATUS_MAP } from 'rapidfab/mappings';

const PrintsGrid = ({ prints }) => (
  <Grid
    data={prints}
    columns={[
      "id",
      "status",
    ]}
    columnMeta={[{
      displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
      columnName: "id",
      customComponent: IdColumn("print"),
      locked: true
    }, {
      columnName: "status",
      displayName: <FormattedMessage id="field.status" defaultMessage='Status'/>,
      customComponent: MappedColumn("status", PRINT_STATUS_MAP),
    }]}
    initialSort="id"
    initialSortAscending={false}
  />
);

PrintsGrid.propTypes = { prints: PropTypes.array };

const Prints = ({ prints, locations, locationFilter, fetching, apiErrors, handleOnChange }) => (
  <BS.Grid fluid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item active={true}>
            <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/plan/runs">
            <Fa name='list'/> <FormattedMessage id="plan.prints" defaultMessage='Prints'/>
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>
    <BS.Row>
      <BS.Col xs={4}>
        {locations.length > 1 ? <Locations
          locations={locations}
          handleOnChange={handleOnChange}
          locationFilter={locationFilter}
        /> : <div/>}
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
        {fetching ? <Loading /> : <PrintsGrid prints={prints}/>}
      </BS.Col>
    </BS.Row>

  </BS.Grid>
);

Prints.propTypes = {
  prints: PropTypes.array,
  locations: PropTypes.array,
  locationFilter: PropTypes.string,
  fetching: PropTypes.bool,
  apiErrors: PropTypes.array,
  handleOnChange: PropTypes.func,
}; 

export default Prints
