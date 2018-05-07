import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Fa from 'react-fontawesome';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins,
} from 'griddle-react';

import griddleStyleConfig from 'rapidfab/components/griddle/griddleStyleConfig';

import { RUN_OPERATION_MAP, RUN_STATUS_MAP } from 'rapidfab/mappings';
import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import CustomHeadingComponent from 'rapidfab/components/griddle/CustomHeadingComponent';
import DateTimeColumn from 'rapidfab/components/griddle/DateTimeColumn';
import FlashMessages from 'rapidfab/components/FlashMessages';
import GriddleLayout from 'rapidfab/components/griddle/GriddleLayout';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import MappedColumn from 'rapidfab/components/griddle/MappedColumn';
import Loading from 'rapidfab/components/Loading';
import Locations from 'rapidfab/components/locations';

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
      <Col xs={12}>
        {fetching ? (
          <Loading />
        ) : (
          <Griddle
            components={{ Layout: GriddleLayout }}
            data={runs}
            pageProperties={{ pageSize: 50 }}
            plugins={[plugins.LocalPlugin]}
            styleConfig={griddleStyleConfig}
          >
            <RowDefinition>
              <ColumnDefinition
                id="id"
                customComponent={props => (
                  <IdColumn {...props} resource="run" />
                )}
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.id"
                    defaultMessage="Id"
                  />
                )}
              />
              <ColumnDefinition
                id="operation"
                customComponent={props => (
                  <MappedColumn {...props} mapping={RUN_OPERATION_MAP} />
                )}
                customHeadingComponent={props => (
                  <CustomHeadingComponent
                    {...props}
                    id="field.operation"
                    defaultMessage="Operation"
                  />
                )}
              />
              <ColumnDefinition
                id="status"
                customComponent={props => (
                  <MappedColumn {...props} mapping={RUN_STATUS_MAP} />
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
            </RowDefinition>
          </Griddle>
        )}
      </Col>
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
