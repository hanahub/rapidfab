import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import Griddle, {
  IdColumn,
  MappedColumn,
  DateColumn,
} from 'rapidfab/components/grid';
import Locations from 'rapidfab/components/locations';
import { RUN_STATUS_MAP } from 'rapidfab/mappings';

const PrintsGrid = ({ gridData }) =>
  <Griddle
    data={gridData}
    columns={['id', 'status', 'name', 'customerName', 'dueDate']}
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
      {
        displayName: (
          <FormattedMessage id="field.order" defaultMessage="Order" />
        ),
        columnName: 'name',
      },
      {
        displayName: (
          <FormattedMessage
            id="field.customer_name"
            defaultMessage="Customer Name"
          />
        ),
        columnName: 'customerName',
      },
      {
        displayName: (
          <FormattedMessage id="field.due_date" defaultMessage="Due Date" />
        ),
        columnName: 'dueDate',
        customComponent: DateColumn,
      },
    ]}
    initialSort="id"
    initialSortAscending={false}
  />;
PrintsGrid.propTypes = { prints: PropTypes.array };

const Prints = ({
  gridData,
  locations,
  locationFilter,
  onLocationChange,
}) => {
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
      <PrintsGrid gridData={gridData} />
    </Grid>
  );
};

Prints.propTypes = {
  locations: PropTypes.array,
  locationFilter: PropTypes.string,
  fetching: PropTypes.bool,
  apiErrors: PropTypes.array,
  handleOnChange: PropTypes.func,
};

export default Prints;
