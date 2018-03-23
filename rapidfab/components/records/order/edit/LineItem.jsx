import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Col, ListGroup, ListGroupItem, Panel, Row } from 'react-bootstrap';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import {
  getPrintsForLineItem,
  getProcessSteps,
  getModels,
} from 'rapidfab/selectors';

import hhmmss from 'rapidfab/utils/hhmmss';
import { PRINT_STATUS_MAPPING } from 'rapidfab/mappings';

import ModelThumbnail from 'rapidfab/components/ModelThumbnail';
import Loading from 'rapidfab/components/Loading';
import {
  FormattedCost,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';

import LineItemEditFormContainer from 'rapidfab/containers/records/order/LineItemEditFormContainer';

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

const Prints = ({ prints }) => (
  <Panel header={PrintsHeader(prints)} bsStyle="primary">
    <ListGroup fill>
      <ListGroupItem key="header">
        <Row>
          <Col xs={6}>
            <b>
              <FormattedMessage id="field.id" defaultMessage="ID" />
            </b>
          </Col>
          <Col xs={3}>
            <b>
              <FormattedMessage id="field.status" defaultMessage="Status" />
            </b>
          </Col>
          <Col xs={3}>
            <b>
              <FormattedMessage id="field.run" defaultMessage="Run" />
            </b>
          </Col>
        </Row>
      </ListGroupItem>

      {prints.map(print => (
        <ListGroupItem>
          <Row>
            <Col xs={6}>
              <a href={`/#/records/print/${print.uuid}`}>{print.name}</a>
            </Col>
            <Col xs={3}>{PRINT_STATUS_MAPPING[print.status]}</Col>
            <Col xs={3}>
              {print.run ? (
                <a href={`/#/records/run/${extractUuid(print.run)}`}>
                  <FontAwesome name="external-link" />
                </a>
              ) : (
                <FormattedMessage id="notAvailable" defaultMessage="N/A" />
              )}
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  </Panel>
);

Prints.propTypes = {
  prints: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Estimates = ({ currency, estimates, model, quantity }) => (
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

      {estimates ? (
        <div>
          <ListGroupItem>
            <Row>
              <Col xs={8}>
                <FormattedMessage
                  id="estimates.printTime"
                  defaultMessage="Print Time"
                />
              </Col>
              <Col xs={4}>
                {estimates.print_time === null ? (
                  <FormattedMessage id="notAvailable" defaultMessage="N/A" />
                ) : (
                  <span>{hhmmss(estimates.print_time)}</span>
                )}
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
                {model && (
                  <div>
                    {model.volume_mm === null ? (
                      <FormattedMessage
                        id="notAvailable"
                        defaultMessage="N/A"
                      />
                    ) : (
                      <FormattedVolume
                        value={model.volume_mm / 1000.0 * quantity}
                      />
                    )}
                  </div>
                )}
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
                {estimates.materials && (
                  <div>
                    {estimates.materials.support === null ? (
                      <FormattedMessage
                        id="notAvailable"
                        defaultMessage="N/A"
                      />
                    ) : (
                      <FormattedVolume value={estimates.materials.support} />
                    )}
                  </div>
                )}
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
                {estimates.post_processing_cost === null ? (
                  <FormattedMessage id="notAvailable" defaultMessage="N/A" />
                ) : (
                  <FormattedCost
                    currency={currency}
                    value={estimates.post_processing_cost}
                  />
                )}
              </Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col xs={8}>
                <FormattedMessage
                  id="estimates.materialCost"
                  defaultMessage="Material Cost"
                />
              </Col>
              <Col xs={4}>
                {estimates.amount === null ? (
                  <FormattedMessage id="notAvailable" defaultMessage="N/A" />
                ) : (
                  <FormattedCost currency={currency} value={estimates.amount} />
                )}
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col xs={8}>
                <FormattedMessage
                  id="estimates.bureauCost"
                  defaultMessage="Bureau Cost"
                />
              </Col>
              <Col xs={4}>
                {estimates.bureau_custom_cost ? (
                  <FormattedCost
                    currency={currency}
                    value={estimates.bureau_custom_cost}
                  />
                ) : (
                  <FormattedMessage id="notAvailable" defaultMessage="N/A" />
                )}
              </Col>
            </Row>
          </ListGroupItem>
        </div>
      ) : (
        <Loading />
      )}
    </ListGroup>
  </Panel>
);

Estimates.defaultProps = {
  estimates: {
    print_time: null,
    amount: null,
    post_processing_cost: null,
    materials: {
      base: null,
      support: null,
    },
  },
  model: {
    volume_mm: null,
  },
  quantity: 0,
};

Estimates.propTypes = {
  currency: PropTypes.string.isRequired,
  estimates: PropTypes.shape({
    print_time: PropTypes.number,
    amount: PropTypes.number,
    post_processing_cost: PropTypes.number,
    materials: PropTypes.shape({
      support: PropTypes.number,
      base: PropTypes.number,
    }),
  }),
  model: PropTypes.shape({
    volume_mm: PropTypes.number,
  }),
  quantity: PropTypes.number,
};

const LineItem = ({ currency, lineItem, model, prints, snapshot }) => {
  // Check if lineItem is stale data from order
  if (!lineItem) {
    return null;
  }
  const { estimates, itar, quantity } = lineItem;

  return (
    <Panel
      header={
        <FormattedMessage id="record.lineItem" defaultMessage="Line Item" />
      }
    >
      <Col xs={12} sm={4}>
        <Row>
          <Col xs={10} xsOffset={1} lg={6} lgOffset={3}>
            <ModelThumbnail snapshot={snapshot} itar={itar} />
          </Col>
        </Row>

        {!itar && (
          <Row>
            <Col xs={12} lg={10} lgOffset={1}>
              <Estimates
                currency={currency}
                estimates={estimates}
                model={model}
                quantity={quantity}
              />
            </Col>
          </Row>
        )}
      </Col>

      <Col xs={12} sm={8}>
        <Row>
          <Col>
            <LineItemEditFormContainer
              lineItem={lineItem}
              formKey={lineItem.uri}
            />
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

const getSnapshotFromLineItem = (lineItem, model) => {
  if (!lineItem || !model) {
    return 'LOADING';
  }
  if (lineItem.itar) {
    return 'ITAR';
  }

  const snapshotContent = model.snapshot_content;

  // the default must return 'loading' due to imperfect information from the
  // event stream. E.g: The UI can receive a model that is 'processed' but
  // without a snapshot

  if (snapshotContent) {
    return snapshotContent;
  } else if (lineItem.status === 'error') {
    return 'ERROR';
  }
  return 'LOADING';
};

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
  const model = lineItem ? models.find(m => m.uri === lineItem.model) : null;

  const snapshot = getSnapshotFromLineItem(lineItem, model);

  return { currency, lineItem, model, prints, snapshot };
};

LineItem.defaultProps = {
  lineItem: null,
  model: {},
};

LineItem.propTypes = {
  currency: PropTypes.string.isRequired,
  lineItem: PropTypes.shape({}),
  model: PropTypes.shape({}).isRequired,
  prints: PropTypes.arrayOf(PropTypes.object).isRequired,
  snapshot: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(LineItem);
