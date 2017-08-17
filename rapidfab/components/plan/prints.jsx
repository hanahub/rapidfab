import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import Griddle, { IdColumn, MappedColumn } from 'rapidfab/components/grid';
import Locations from 'rapidfab/components/locations';
import { RUN_STATUS_MAP } from 'rapidfab/mappings';

const PrintsGrid = ({ prints }) =>
  <Griddle
    data={prints}
    columns={['id', 'status']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('print'),
        locked: true,
      },
      {
        columnName: 'status',
        displayName: (
          <FormattedMessage id="field.status" defaultMessage="Status" />
        ),
        customComponent: MappedColumn('status', RUN_STATUS_MAP),
      },
    ]}
    initialSort="id"
    initialSortAscending={false}
  />;
PrintsGrid.propTypes = { prints: PropTypes.array };

const Prints = ({ prints, locations, locationFilter, onLocationChange }) => {
  const breadcrumbs = ['prints'];
  return (
    <Grid fluid className="container">
      <BreadcrumbNav breadcrumbs={breadcrumbs} />
      <Locations
        locations={locations}
        locationFilter={locationFilter}
        handleOnChange={onLocationChange}
      />
      <hr />
      <PrintsGrid prints={prints} />
    </Grid>
  );
};

Prints.propTypes = {
  prints: PropTypes.array,
  locations: PropTypes.array,
  locationFilter: PropTypes.string,
  fetching: PropTypes.bool,
  apiErrors: PropTypes.array,
  handleOnChange: PropTypes.func,
};

export default Prints;
