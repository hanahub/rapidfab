import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'rapidfab/i18n';
import { Col, ListGroup, ListGroupItem, Panel, Row } from 'react-bootstrap';

const ProcessStepHeader = processSteps => {
  const complete = processSteps
    .reduce(
      (total, step) => (step.status === 'complete' ? total + 1 : total),
      0
    )
    .toString();
  const total = (processSteps ? processSteps.length : 0).toString();
  return (
    <FormattedMessage
      id="record.processStepCompleteCount"
      defaultMessage={'Process Steps - {complete} / {total} complete'}
      values={{ complete, total }}
    />
  );
};

const statusMapping = {
  created: <FormattedMessage id="status.created" defaultMessage="Created" />,
  calculating: (
    <FormattedMessage id="status.calculating" defaultMessage="Calculating" />
  ),
  calculated: (
    <FormattedMessage id="status.calculated" defaultMessage="Calculated" />
  ),
  queued: <FormattedMessage id="status.queued" defaultMessage="Queued" />,
  'in-progress': (
    <FormattedMessage id="status.in_progress" defaultMessage="In Progress" />
  ),
  complete: <FormattedMessage id="status.complete" defaultMessage="Complete" />,
  error: <FormattedMessage id="status.error" defaultMessage="Error" />,
};

const RunTime = connect(({ resources }, { uuid }) => {
  const time = resources[uuid] ? resources[uuid].actuals.time : null;
  return Object.assign(
    {},
    time ? { time: time.print || time.post_processing || time.shipping } : null
  );
})(({ time }) => (
  <span>
    {time || <FormattedMessage id="notAvailable" defaultMessage="N/A" />}
  </span>
));

const ProcessStep = ({ step }) => {
  let name = '';
  if (step.process_step && step.process_step.name) {
    name = step.process_step.name;
  } else if (step.process_step && step.process_step.process_type) {
    name = step.process_step.process_type.name;
  }
  return (
    <ListGroupItem>
      <Row>
        <Col xs={4}>{name}</Col>
        <Col xs={4}>{statusMapping[step.status]}</Col>
        <Col xs={4}>
          {step.run ? (
            <RunTime uuid={step.run} />
          ) : (
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          )}
        </Col>
      </Row>
    </ListGroupItem>
  );
};

ProcessStep.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

const ProcessSteps = ({ processSteps }) => (
  <Panel header={ProcessStepHeader(processSteps)} bsStyle="primary">
    <ListGroup fill>
      <ListGroupItem key="header">
        <Row>
          <Col xs={4}>
            <b>
              <FormattedMessage id="field.name" defaultMessage="Name" />
            </b>
          </Col>
          <Col xs={4}>
            <b>
              <FormattedMessage id="field.status" defaultMessage="Status" />
            </b>
          </Col>
          <Col xs={4}>
            <b>
              <FormattedMessage id="time" defaultMessage="Time" />
            </b>
          </Col>
        </Row>
      </ListGroupItem>

      {processSteps.map(step => <ProcessStep key={step.id} step={step} />)}
    </ListGroup>
  </Panel>
);

ProcessSteps.propTypes = {
  processSteps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProcessSteps;
