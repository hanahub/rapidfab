import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Col, ListGroup, ListGroupItem, Panel, Row } from 'react-bootstrap';

import {
  FormattedCost,
  FormattedDuration,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';

const OrderEstimates = ({
  amount,
  base,
  currency,
  postProcessing,
  printTime,
  shippingAmount,
  support,
}) => (
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
      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage
              id="estimates.printTime"
              defaultMessage="Print Time"
            />
          </Col>
          <Col xs={4}>
            {printTime !== null ? (
              <FormattedDuration value={printTime} />
            ) : (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
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
            {base ? (
              <FormattedVolume value={base} />
            ) : (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
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
            {support ? (
              <FormattedVolume value={support} />
            ) : (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
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
            {postProcessing ? (
              <FormattedCost currency={currency} value={postProcessing} />
            ) : (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            )}
          </Col>
        </Row>
      </ListGroupItem>

      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage
              id="estimates.shippingCost"
              defaultMessage="Shipping Cost"
            />
          </Col>
          <Col xs={4}>
            {shippingAmount ? (
              <FormattedCost currency={currency} value={shippingAmount} />
            ) : (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            )}
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
            {amount ? (
              <FormattedCost currency={currency} value={amount} />
            ) : (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            )}
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Panel>
);

const mapStateToProps = state => {
  const { resources, routeUUID } = state;
  const { currency, estimates } = resources[routeUUID];

  const amount = _.get(estimates, 'cost.amount', null);
  const base = _.get(estimates, 'materials.base', null);
  const postProcessing = _.get(estimates, 'cost.post_processing', null);
  const printTime = _.get(estimates, 'print_time', null);
  const shippingAmount = _.get(estimates, 'cost.shipping_amount', null);
  const support = _.get(estimates, 'materials.support', null);

  return {
    amount,
    base,
    currency,
    postProcessing,
    printTime,
    shippingAmount,
    support,
  };
};

OrderEstimates.defaultProps = {
  amount: null,
  base: null,
  currency: 'USD',
  postProcessing: null,
  printTime: null,
  shippingAmount: null,
  support: null,
};

OrderEstimates.propTypes = {
  amount: PropTypes.number,
  base: PropTypes.number,
  currency: PropTypes.string,
  postProcessing: PropTypes.number,
  printTime: PropTypes.number,
  shippingAmount: PropTypes.number,
  support: PropTypes.number,
};

export default connect(mapStateToProps)(OrderEstimates);
