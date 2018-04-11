import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'react-bootstrap';
import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins,
} from 'griddle-react';

import griddleStyleConfig from 'rapidfab/components/griddle/griddleStyleConfig';
import { PRINT_STATUS_MAPPING } from 'rapidfab/mappings';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
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
              customHeadingComponent={() => (
                <FormattedMessage id="field.name" defaultMessage="Name" />
              )}
            />
            <ColumnDefinition
              id="id"
              customHeadingComponent={() => (
                <FormattedMessage id="field.id" defaultMessage="Id" />
              )}
              customComponent={props => (
                <IdColumn {...props} resource={'print'} />
              )}
            />
            <ColumnDefinition
              id="customerName"
              customHeadingComponent={() => (
                <FormattedMessage
                  id="field.customerName"
                  defaultMessage="Customer Name"
                />
              )}
            />
            <ColumnDefinition
              id="status"
              title="Status"
              customComponent={({ value }) => (
                <MappedColumn mapping={PRINT_STATUS_MAPPING} value={value} />
              )}
            />
            <ColumnDefinition
              id="dueDate"
              customHeadingComponent={() => (
                <FormattedMessage
                  id="field.dueDate"
                  defaultMessage="Due Date"
                />
              )}
              customComponent={DateTimeColumn}
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
