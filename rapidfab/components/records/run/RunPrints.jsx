import React from 'react';
import PropTypes from 'prop-types';

import { Panel } from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';
import Griddle, {
  ColumnDefinition,
  RowDefinition,
  plugins,
} from 'griddle-react';

import griddleStyleConfig from 'rapidfab/components/griddle/griddleStyleConfig';

import DateTimeColumn from 'rapidfab/components/griddle/DateTimeColumn';
import IdColumn from 'rapidfab/components/griddle/IdColumn';
import ResourceColumn from 'rapidfab/components/griddle/ResourceColumn';

const Layout = ({ Table }) => <Table />;
Layout.propTypes = { Table: PropTypes.func.isRequired };

const RunPrints = ({ gridData, orders }) => (
  <Panel header="Prints" fill>
    <Griddle
      components={{ Layout }}
      data={gridData}
      plugins={[plugins.LocalPlugin]}
      styleConfig={griddleStyleConfig}
    >
      <RowDefinition>
        <ColumnDefinition
          id="id"
          customHeadingComponent={() => (
            <FormattedMessage id="field.id" defaultMessage="Id" />
          )}
          customComponent={props => <IdColumn {...props} resource={'print'} />}
        />
        <ColumnDefinition
          id="order"
          customComponent={props => (
            <ResourceColumn {...props} resource="order" resources={orders} />
          )}
          customHeadingComponent={() => (
            <FormattedMessage id="field.order" defaultMessage="Order" />
          )}
        />
        <ColumnDefinition
          id="dueDate"
          customHeadingComponent={() => (
            <FormattedMessage id="field.dueDate" defaultMessage="Due Date" />
          )}
          customComponent={DateTimeColumn}
        />
      </RowDefinition>
    </Griddle>
  </Panel>
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
