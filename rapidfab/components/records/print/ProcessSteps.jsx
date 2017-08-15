import React from 'react';
import { FormattedMessage } from 'rapidfab/i18n';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Panel,
  Row,
} from 'react-bootstrap';

const ProcessStepHeader = (processSteps) => {
  const complete = processSteps.reduce((total, step) => (
    step.status === 'complete' ? total + 1 : total
  ), 0).toString();
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
  created: (
    <FormattedMessage id="status.created" defaultMessage="Created" />
  ),
  calculating: (
    <FormattedMessage id="status.calculating" defaultMessage="Calculating" />
  ),
  calculated: (
    <FormattedMessage id="status.calculated" defaultMessage="Calculated" />
  ),
  queued: (
    <FormattedMessage id="status.queued" defaultMessage="Queued" />
  ),
  'in-progress': (
    <FormattedMessage id="status.in_progress" defaultMessage="In Progress" />
  ),
  complete: (
    <FormattedMessage id="status.complete" defaultMessage="Complete" />
  ),
  error: (
    <FormattedMessage id="status.error" defaultMessage="Error" />
  ),
};

const ProcessStep = ({ step }) => (
  <ListGroupItem>
    <Row>
      <Col xs={6}>
        {step.id}
      </Col>
      <Col xs={6}>
        {statusMapping[step.status]}
      </Col>
    </Row>
  </ListGroupItem>
);

const ProcessSteps = ({ processSteps = [] }) => (
  <Panel header={ProcessStepHeader(processSteps)} bsStyle="primary">
    <ListGroup fill>

      <ListGroupItem key="header">
        <Row>
          <Col xs={6}>
            <b><FormattedMessage id="field.id" defaultMessage="ID" /></b>
          </Col>
          <Col xs={6}>
            <b><FormattedMessage id="field.status" defaultMessage="Status" /></b>
          </Col>
        </Row>
      </ListGroupItem>

      { processSteps.map(step => <ProcessStep key={step.id} step={step} />) }

    </ListGroup>
  </Panel>
);

export default ProcessSteps;
