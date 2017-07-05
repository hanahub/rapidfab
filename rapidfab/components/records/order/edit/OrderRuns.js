import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Panel,
  Row,
} from 'react-bootstrap';

import { getRunsForOrder } from 'rapidfab/selectors';

import Loading from 'rapidfab/components/Loading';

const Header = (runs) => {
  const complete = runs.reduce( (total, run) => {
    return run.status == 'complete' ? total + 1 : total;
  }, 0).toString();
  const total = (!!runs ? runs.length : 0).toString();

  return (
    <FormattedMessage
      id="record.runCompleteCount"
      defaultMessage={`Runs - {complete} / {total} complete`}
      values={{complete: complete, total: total}}
    />
  )
}

const statusMapping = {
  created           : (<FormattedMessage id="status.created" defaultMessage="Created"/>),
  calculating       : (<FormattedMessage id="status.calculating" defaultMessage="Calculating"/>),
  calculated        : (<FormattedMessage id="status.calculated" defaultMessage="Calculated"/>),
  queued            : (<FormattedMessage id="status.queued" defaultMessage="Queued"/>),
  "in-progress"     : (<FormattedMessage id="status.inProgress" defaultMessage="In Progress"/>),
  complete          : (<FormattedMessage id="status.complete" defaultMessage="Complete"/>),
  error             : (<FormattedMessage id="status.error" defaultMessage="Error"/>),
};

const RunItem = ({ run }) => (
  <ListGroupItem>
    <Row>
      <Col xs={6}>
        <a href={`#/records/run/${run.uuid}`}>
          <abbr title={run.uuid} style={{ cursor: "pointer" }}>{run.id}</abbr>
        </a>
      </Col>
      <Col xs={6}>
        {statusMapping[run.status]}
      </Col>
    </Row>
  </ListGroupItem>
);

const OrderRuns = ({ runs = [], fetching = true }) => {
  if ( fetching ) {
    return (
      <Panel header="Runs">
        <Loading />
      </Panel>
    );
  } else if (runs.length) {
    return (
      <Panel header={Header(runs)}>
        <ListGroup fill>
          <ListGroupItem key="header">
            <Row>
              <Col xs={6}>
                ID
              </Col>
              <Col xs={6}>
                Status
              </Col>
            </Row>
          </ListGroupItem>

          { runs.map(run => <RunItem key={run.id} run={run} />) }

        </ListGroup>
      </Panel>
    );
  } else {
    return (
      <Panel
        header={
          <FormattedMessage
            id="record.noRuns"
            defaultMessage="Runs - order not assigned to any runs yet"
          />
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  const order = state.resources[state.routeUUID.uuid];
  const runs = getRunsForOrder(state, order);
  const { fetching } = state.ui.wyatt.run.list;

  return { fetching, runs };
}

export default connect(mapStateToProps)(OrderRuns)