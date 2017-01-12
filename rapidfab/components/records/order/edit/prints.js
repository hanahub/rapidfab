import _                                                      from 'lodash';
import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedMessage
} from 'rapidfab/i18n';

const Header = ( prints ) => {
  const complete = (_.reduce(prints, (total, print) => print.status == 'complete' ? total + 1 : total, 0)).toString();
  const total = (!!prints ? prints.length : 0).toString();
  return (
    <FormattedMessage id="record.printCompleteCount" defaultMessage={`Prints - {complete} / {total} complete`} values={{complete: complete, total: total}}/>
  )
}

const PrintItem = ({ print }) => {
  const statusMapping = {
    created           : (<FormattedMessage id="status.created" defaultMessage="Created"/>),
    calculating       : (<FormattedMessage id="status.calculating" defaultMessage="Calculating"/>),
    calculated        : (<FormattedMessage id="status.calculated" defaultMessage="Calculated"/>),
    queued            : (<FormattedMessage id="status.queued" defaultMessage="Queued"/>),
    "in-progress"     : (<FormattedMessage id="status.in_progress" defaultMessage="In Progress"/>),
    complete          : (<FormattedMessage id="status.complete" defaultMessage="Complete"/>),
    error             : (<FormattedMessage id="status.error" defaultMessage="Error"/>),
  };

  return (
    <BS.ListGroupItem>
      <BS.Row>
        <BS.Col xs={6}>
          {print.id}
        </BS.Col>
        <BS.Col xs={6}>
          {statusMapping[print.status]}
        </BS.Col>
      </BS.Row>
    </BS.ListGroupItem>
  );
}

const OrderPrints = ({ prints }) => (
  <BS.Panel header={Header(prints)} bsStyle="primary">
    <BS.ListGroup fill>
      <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
        <BS.Row>
          <BS.Col xs={6}>
            <b><FormattedMessage id="field.id" defaultMessage="ID"/></b>
          </BS.Col>
          <BS.Col xs={6}>
            <b><FormattedMessage id="field.status" defaultMessage="Status"/></b>
          </BS.Col>
        </BS.Row>
      </BS.ListGroupItem>
      <div style={{overflowY: 'scroll', height: 215}}>
        {_.map(prints, print => (
          <PrintItem print={print} />))
        }
      </div>
    </BS.ListGroup>
  </BS.Panel>
)

export default OrderPrints
