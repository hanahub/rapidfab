import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as BS from 'react-bootstrap';

import * as Selectors from 'rapidfab/selectors'
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'rapidfab/i18n';
import { getRunsForOrder, getRouteResource } from 'rapidfab/selectors';

const Header = ( runs ) => {
  const complete = (_.reduce(runs, (total, run) => run.status == 'complete' ? total + 1 : total, 0)).toString();
  const total = (!!runs ? runs.length : 0).toString();
  return (
    <FormattedMessage id="record.runCompleteCount" defaultMessage={`Runs - {complete} / {total} complete`} values={{complete: complete, total: total}}/>
  )
}

const RunItem = ({ run }) => {
  const statusMapping = {
    created           : (<FormattedMessage id="status.created" defaultMessage="Created"/>),
    calculating       : (<FormattedMessage id="status.calculating" defaultMessage="Calculating"/>),
    calculated        : (<FormattedMessage id="status.calculated" defaultMessage="Calculated"/>),
    queued            : (<FormattedMessage id="status.queued" defaultMessage="Queued"/>),
    "in-progress"     : (<FormattedMessage id="status.inProgress" defaultMessage="In Progress"/>),
    complete          : (<FormattedMessage id="status.complete" defaultMessage="Complete"/>),
    error             : (<FormattedMessage id="status.error" defaultMessage="Error"/>),
  };

  return (
  <BS.ListGroupItem>
    <BS.Row>
      <BS.Col xs={6}>
        <a href={`#/records/run/${run.uuid}`}>
          <abbr title={run.uuid} style={{ cursor: "pointer" }}>{run.id}</abbr>
        </a>
      </BS.Col>
      <BS.Col xs={6}>
        {statusMapping[run.status]}
      </BS.Col>
    </BS.Row>
  </BS.ListGroupItem>
);}

const OrderRuns = ({ runs = [] }) => {
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
            { runs.map(run => <RunItem key={run.id} run={run} />) }
          </div>
        </BS.ListGroup>
      </BS.Panel>
    );
  } else {
    return (<BS.Panel header={<FormattedMessage id="record.noRuns" defaultMessage="Runs - order not assigned to any runs yet"/>}/>);
  }
}

const mapStateToProps = (state) => {
  const order = state.resources[state.routeUUID.uuid];
  const runs = Selectors.getRunsForOrder(state, order)
  return { runs };
}

export default connect(mapStateToProps)(OrderRuns)
