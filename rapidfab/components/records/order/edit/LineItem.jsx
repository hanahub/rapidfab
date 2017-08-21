import React from 'react';
import { connect } from 'react-redux';
import { Col, ListGroup, ListGroupItem, Panel, Row } from 'react-bootstrap';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import {
  getPrintsForLineItem,
  getProcessSteps,
  getModels,
} from 'rapidfab/selectors';

import ModelThumbnail from 'rapidfab/components/ModelThumbnail';
import Loading from 'rapidfab/components/Loading';
import {
  FormattedCost,
  FormattedDuration,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';

import LineItemForm from './LineItemForm';

const LineItemHeader = () =>
  <FormattedMessage id="record.lineItem" defaultMessage="Line Item" />;

const PrintsHeader = prints => {
  const complete = prints
    .reduce(
      (total, print) => (print.status === 'complete' ? total + 1 : total),
      0
    )
    .toString();
  const total = (prints ? prints.length : 0).toString();
  return (
    <FormattedMessage
      id="record.printCompleteCount"
      defaultMessage={'Prints - {complete} / {total} complete'}
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

const PrintItem = ({ print }) =>
  <ListGroupItem>
    <Row>
      <Col xs={6}>
        <a href={`/#/records/print/${print.uuid}`}>
          {print.id}
        </a>
      </Col>
      <Col xs={6}>
        {statusMapping[print.status]}
      </Col>
    </Row>
  </ListGroupItem>;

const Prints = ({ prints }) =>
  <Panel header={PrintsHeader(prints)} bsStyle="primary">
    <ListGroup fill>
      <ListGroupItem key="header">
        <Row>
          <Col xs={6}>
            <b>
              <FormattedMessage id="field.id" defaultMessage="ID" />
            </b>
          </Col>
          <Col xs={6}>
            <b>
              <FormattedMessage id="field.status" defaultMessage="Status" />
            </b>
          </Col>
        </Row>
      </ListGroupItem>

      {prints.map(print => <PrintItem key={print.id} print={print} />)}
    </ListGroup>
  </Panel>;

const Estimates = ({ estimates, currency }) =>
  <Panel bsStyle="info">
    <ListGroup fill>
      <ListGroupItem key="header">
        <b>
          <FormattedMessage
            id="estimates.estimates"
            defaultMessage="Estimates"
          />
        </b>
      </ListGroupItem>

      {estimates
        ? <div>
            <ListGroupItem>
              <Row>
                <Col xs={8}>
                  <FormattedMessage
                    id="estimates.printTime"
                    defaultMessage="Print Time"
                  />
                </Col>
                <Col xs={4}>
                  {estimates.print_time
                    ? <FormattedDuration value={estimates.print_time} />
                    : <FormattedMessage
                        id="notAvailable"
                        defaultMessage="N/A"
                      />}
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col xs={8}>
                  <FormattedMessage
                    id="estimates.materialUsed"
                    defaultMessage="Material Used"
                  />
                </Col>
                <Col xs={4}>
                  {estimates.materials.base
                    ? <FormattedVolume value={estimates.materials.base} />
                    : <FormattedMessage
                        id="notAvailable"
                        defaultMessage="N/A"
                      />}
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col xs={8}>
                  <FormattedMessage
                    id="estimates.supportUsed"
                    defaultMessage="Support Used"
                  />
                </Col>
                <Col xs={4}>
                  {estimates.materials.support
                    ? <FormattedVolume value={estimates.materials.support} />
                    : <FormattedMessage
                        id="notAvailable"
                        defaultMessage="N/A"
                      />}
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col xs={8}>
                  <FormattedMessage
                    id="estimates.postProcessingCost"
                    defaultMessage="Post Processing Cost"
                  />
                </Col>
                <Col xs={4}>
                  {estimates.post_processing_cost
                    ? <FormattedCost
                        currency={currency}
                        value={estimates.post_processing_cost}
                      />
                    : <FormattedMessage
                        id="notAvailable"
                        defaultMessage="N/A"
                      />}
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col xs={8}>
                  <FormattedMessage
                    id="estimates.printingCost"
                    defaultMessage="Printing Cost"
                  />
                </Col>
                <Col xs={4}>
                  {estimates.amount
                    ? <FormattedCost
                        currency={currency}
                        value={estimates.amount}
                      />
                    : <FormattedMessage
                        id="notAvailable"
                        defaultMessage="N/A"
                      />}
                </Col>
              </Row>
            </ListGroupItem>
          </div>
        : <Loading />}
    </ListGroup>
  </Panel>;

const LineItem = ({ currency, lineItem, prints, snapshot }) => {
  // Check if lineItem is stale data from order
  if (!lineItem) {
    return null;
  }
  const { estimates, itar } = lineItem;

  return (
    <Panel header={<LineItemHeader />}>
      <Col xs={12} sm={4}>
        <Row>
          <Col xs={10} xsOffset={1} lg={6} lgOffset={3}>
            <ModelThumbnail snapshot={snapshot} itar={itar} />
          </Col>
        </Row>

        {itar
          ? null
          : <Row>
              <Col xs={12} lg={10} lgOffset={1}>
                <Estimates estimates={estimates} currency={currency} />
              </Col>
            </Row>}
      </Col>

      <Col xs={12} sm={8}>
        <Row>
          <Col>
            <LineItemForm lineItem={lineItem} formKey={lineItem.uri} />
          </Col>
        </Row>

        <Row>
          <Col xs={9} xsOffset={3}>
            <Prints prints={prints} style={{ padding: '20px' }} />
          </Col>
        </Row>
      </Col>
    </Panel>
  );
};

function getSnapshotFromLineItem(lineItem, models) {
  if (!lineItem || models.length === 0) {
    return 'LOADING';
  }
  if (lineItem.itar) {
    return 'ITAR';
  }

  const model = models.find(model => model.uri === lineItem.model);

  if (!model) {
    return 'ERROR';
  }

  const { snapshot_content } = model;

  // the default must return 'loading' due to imperfect information from the
  // event stream. E.g: The UI can receive a model that is 'processed' but
  // without a snapshot

  if (snapshot_content) {
    return snapshot_content;
  } else if (lineItem.status === 'error') {
    return 'ERROR';
  }
  return 'LOADING';
}

const mapStateToProps = (state, ownProps) => {
  const { uri } = ownProps;
  const uuid = extractUuid(uri);
  const order = state.resources[state.routeUUID];
  const { currency } = order;
  const lineItem = state.resources[uuid];
  const allPrints = getPrintsForLineItem(state, lineItem);
  const printProcessSteps = getProcessSteps(state).filter(step =>
    step.process_type_uri.includes('printer-type')
  );
  const prints = allPrints.filter(print =>
    printProcessSteps.some(step => step.uri === print.process_step)
  );
  const models = getModels(state);
  const snapshot = getSnapshotFromLineItem(lineItem, models);

  return { currency, lineItem, prints, snapshot };
};

export default connect(mapStateToProps)(LineItem);
