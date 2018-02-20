import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Col, ListGroup, ListGroupItem, Panel, Row } from 'react-bootstrap';

import {
  FormattedCost,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';

import hhmmss from 'rapidfab/utils/hhmmss';
import { getOrderMaterialUsedEstimate } from 'rapidfab/selectors';

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
            {printTime === null ? (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            ) : (
              <span>{hhmmss(printTime)}</span>
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
            {base === null ? (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            ) : (
              <FormattedVolume value={base} />
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
            {support === null ? (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            ) : (
              <FormattedVolume value={support} />
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
            {postProcessing === null ? (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            ) : (
              <FormattedCost currency={currency} value={postProcessing} />
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
            {shippingAmount === null ? (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            ) : (
              <FormattedCost currency={currency} value={shippingAmount} />
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
            {amount === null ? (
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            ) : (
              <FormattedCost currency={currency} value={amount} />
            )}
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Panel>
);

const mapStateToProps = state => {
  const { resources, routeUUID } = state;
  const { currency, estimates, uri } = resources[routeUUID];

  const amount = _.get(estimates, 'cost.amount', null);
  const base = getOrderMaterialUsedEstimate(state, uri);
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
