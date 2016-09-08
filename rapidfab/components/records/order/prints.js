import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedMessage
} from 'rapidfab/i18n';
import Grid, { IdColumn }     from 'rapidfab/components/grid'

const OrderPrints = ({ prints }) => (
  <BS.Panel header={<FormattedMessage id="prints" defaultMessage='Prints'/>} bsStyle="primary">
    <Grid
      data={prints}
      columns={[
        "id",
        "status",
      ]}
      columnMeta={[{
        displayName: <FormattedMessage id="field.id" defaultMessage='Id'/>,
        columnName: "run.id",
        customComponent: IdColumn("print"),
        locked: true
      }, {
        columnName: "status",
        displayName: <FormattedMessage id="field.status" defaultMessage='Status'/>
      }]}
    />
  </BS.Panel>
)

export default OrderPrints
