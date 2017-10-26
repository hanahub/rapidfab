import React from 'react';
import PropTypes from 'prop-types';

import { Label } from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';
import Grid, { IdColumn, DateColumn } from 'rapidfab/components/grid';

const RunPrints = ({ gridData, orders }) => (
  <div>
    <Label>Prints</Label>
    <Grid
      data={gridData}
      columns={['id', 'order', 'dueDate', 'customerName']}
      columnMeta={[
        {
          displayName: <FormattedMessage id="field.id" defaultMessage="ID" />,
          columnName: 'id',
          customComponent: IdColumn('print'),
          locked: true,
        },
        {
          displayName: (
            <FormattedMessage id="field.order" defaultMessage="Order" />
          ),
          columnName: 'order',
          customComponent: IdColumn('order', 'order', orders, 'name'),
        },
        {
          displayName: (
            <FormattedMessage id="field.due_date" defaultMessage="Due Date" />
          ),
          columnName: 'dueDate',
          customComponent: DateColumn,
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
      ]}
    />
  </div>
);

RunPrints.propTypes = {
  gridData: PropTypes.arrayOf(
    PropTypes.shape({
      customerName: PropTypes.string,
      dueDate: PropTypes.string,
      id: PropTypes.string,
      order: PropTypes.string,
      uuid: PropTypes.string,
    })
  ).isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RunPrints;
