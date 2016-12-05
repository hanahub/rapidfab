import _                                                      from 'lodash';
import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedMessage
} from 'rapidfab/i18n';

const Header = ( runs ) => {
  const complete = (_.reduce(runs, (total, run) => run.status == 'complete' ? total + 1 : total, 0)).toString();
  const total = (!!runs ? runs.length : 0).toString();
  return (
    <FormattedMessage id="record.runCompleteCount" defaultMessage={`Runs - {complete} / {total} complete`} values={{complete: complete, total: total}}/>
  )
}


const RunItem = ({ run }) => {
  const status = {
    created           : (<FormattedMessage id="status.created" defaultMessage="Created"/>),
    calculating       : (<FormattedMessage id="status.calculating" defaultMessage="Calculating"/>),
    calculated        : (<FormattedMessage id="status.calculated" defaultMessage="Calculated"/>),
    queued            : (<FormattedMessage id="status.queued" defaultMessage="Queued"/>),
    printing          : (<FormattedMessage id="status.printing" defaultMessage="Printing"/>),
    "post-processing" : (<FormattedMessage id="status.post_processing" defaultMessage="Post Processing"/>),
    complete          : (<FormattedMessage id="status.complete" defaultMessage="Complete"/>),
    error             : (<FormattedMessage id="status.error" defaultMessage="Error"/>),
  }[run.status];

  return (
  <BS.ListGroupItem>
    <BS.Row>
      <BS.Col xs={6}>
        <a href={`#/records/run/${run.uuid}`}>
          <abbr title={run.uuid} style={{ cursor: "pointer" }}>{run.id}</abbr>
        </a>
      </BS.Col>
      <BS.Col xs={6}>
        {status}
      </BS.Col>
    </BS.Row>
  </BS.ListGroupItem>
);}

const OrderRuns = ({ runs }) => {
  if(runs.length) {
    return (
      <BS.Panel header={Header(runs)}>
        <BS.ListGroup fill>
          <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
            <BS.Row>
              <BS.Col xs={6}>
                ID
              </BS.Col>
              <BS.Col xs={6}>
                Status
              </BS.Col>
            </BS.Row>
          </BS.ListGroupItem>
          <div style={{overflowY: 'scroll', height: 215}}>
            {_.map(runs, run => (
              <RunItem run={run} />))
            }
          </div>
        </BS.ListGroup>
      </BS.Panel>
    );
  } else {
    return (<BS.Panel header={<FormattedMessage id="record.noRuns" defaultMessage="Runs - order not assigned to any runs yet"/>}/>);
  }
}

export default OrderRuns
