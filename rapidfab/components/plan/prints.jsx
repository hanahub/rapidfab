import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Griddle, {
  IdColumn,
  MappedColumn,
  DateColumn,
} from 'rapidfab/components/grid';
import Loading from 'rapidfab/components/Loading';
import Locations from 'rapidfab/components/locations';
import { RUN_STATUS_MAP } from 'rapidfab/mappings';

const PrintsGrid = ({ gridData }) => (
  <Griddle
    data={gridData}
    columns={['id', 'name', 'customerName', 'status', 'dueDate']}
    columnMeta={[
      {
        displayName: <FormattedMessage id="field.id" defaultMessage="Id" />,
        columnName: 'id',
        customComponent: IdColumn('print'),
        locked: true,
      },
      {
        displayName: (
          <FormattedMessage id="field.print" defaultMessage="Print" />
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
        columnName: 'status',
        displayName: (
          <FormattedMessage id="field.status" defaultMessage="Status" />
        ),
        customComponent: MappedColumn('status', RUN_STATUS_MAP),
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
  />
);

PrintsGrid.propTypes = {
  gridData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      name: PropTypes.string,
      customerName: PropTypes.string,
      dueDate: PropTypes.date,
    })
  ).isRequired,
};

const Prints = ({ fetching, gridData, locations, handleOnChange }) => {
  const breadcrumbs = ['prints'];
  return (
    <Grid fluid className="container">
      <BreadcrumbNav breadcrumbs={breadcrumbs} />
      <Locations locations={locations} handleOnChange={handleOnChange} />
      <hr />
      {fetching ? <Loading /> : <PrintsGrid gridData={gridData} />}
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
