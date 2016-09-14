import _                                                      from 'lodash';
import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedMessage
} from 'rapidfab/i18n';
import Grid, { IdColumn }     from 'rapidfab/components/grid'

const Header = ( prints ) => {
  const complete = (_.reduce(prints, (total, print) => print.status == 'complete' ? total + 1 : total, 0)).toString();
  const total = (!!prints ? prints.length : 0).toString();
  return (
    <FormattedMessage id="prints" defaultMessage={`Prints - {complete} / {total} complete`} values={{complete: complete, total: total}}/>
  )
}

const OrderPrints = ({ prints }) => (
  <BS.Panel header={Header(prints)} bsStyle="primary">
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
