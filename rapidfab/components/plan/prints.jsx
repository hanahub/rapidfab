import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins,
} from 'griddle-react';

import griddleStyleConfig from 'rapidfab/components/griddle/griddleStyleConfig';
import { PRINT_STATUS_MAPPING } from 'rapidfab/mappings';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import CustomHeadingComponent from 'rapidfab/components/griddle/CustomHeadingComponent';
import DateTimeColumn from 'rapidfab/components/griddle/DateTimeColumn';
import FlashMessages from 'rapidfab/components/FlashMessages';
import GriddleLayout from 'rapidfab/components/griddle/GriddleLayout';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import Loading from 'rapidfab/components/Loading';
import Locations from 'rapidfab/components/locations';
import MappedColumn from 'rapidfab/components/griddle/MappedColumn';

const Prints = ({ fetching, gridData, locations, handleOnChange }) => {
  const breadcrumbs = ['prints'];
  return (
    <Grid fluid className="container">
      <BreadcrumbNav breadcrumbs={breadcrumbs} />
      <FlashMessages />
      <Locations locations={locations} handleOnChange={handleOnChange} />
      <hr />
      {fetching ? (
        <Loading />
      ) : (
        <Griddle
          components={{ Layout: GriddleLayout }}
          data={gridData}
          plugins={[plugins.LocalPlugin]}
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
                <IdColumn {...props} resource={'print'} />
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
              id="customerName"
              customHeadingComponent={props => (
                <CustomHeadingComponent
                  {...props}
                  id="field.customerName"
                  defaultMessage="Customer Name"
                />
              )}
            />
            <ColumnDefinition
              id="status"
              customComponent={({ value }) => (
                <MappedColumn mapping={PRINT_STATUS_MAPPING} value={value} />
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
              id="dueDate"
              customComponent={DateTimeColumn}
              customHeadingComponent={props => (
                <CustomHeadingComponent
                  {...props}
                  id="field.dueDate"
                  defaultMessage="Due Date"
                />
              )}
            />
          </RowDefinition>
        </Griddle>
      )}
    </Grid>
  );
};

Prints.propTypes = {
  fetching: PropTypes.bool.isRequired,
  gridData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      name: PropTypes.string,
      customerName: PropTypes.string,
      dueDate: PropTypes.date,
    })
  ).isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

export default Prints;
