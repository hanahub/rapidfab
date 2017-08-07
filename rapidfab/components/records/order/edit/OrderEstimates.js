import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Panel,
  Row,
} from 'react-bootstrap';

import {
  FormattedCost,
  FormattedDuration,
  FormattedMessage,
  FormattedVolume,
}
from 'rapidfab/i18n';

const OrderEstimates = ({
  amount = null,
  base = null,
  currency = 'USD',
  print_time = null,
  shipping_amount = null,
  support = null,
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
              defaultMessage='Print Time'
            />
          </Col>
          <Col xs={4}>
            { print_time ?
              <FormattedDuration value={print_time}/>
              : <FormattedMessage id="notAvailable" defaultMessage='N/A'/>
            }
          </Col>
        </Row>
      </ListGroupItem>

      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage
              id="estimates.materialUsed"
              defaultMessage='Material Used'
            />
          </Col>
          <Col xs={4}>
            { base ?
              <FormattedVolume value={base}/>
              : <FormattedMessage id="notAvailable" defaultMessage='N/A'/>
            }
          </Col>
        </Row>
      </ListGroupItem>

      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage
              id="estimates.supportUsed"
              defaultMessage='Support Used'
            />
          </Col>
          <Col xs={4}>
            { support ?
              <FormattedVolume value={support}/>
              : <FormattedMessage id="notAvailable" defaultMessage='N/A'/>
            }
          </Col>
        </Row>
      </ListGroupItem>

      <ListGroupItem>
        <Row>
          <Col xs={8}>
            <FormattedMessage id="estimates.cost" defaultMessage='Cost'/>
          </Col>
          <Col xs={4}>
            { amount ?
              <FormattedCost currency={currency} value={amount} />
              : <FormattedMessage id="notAvailable" defaultMessage='N/A'/>
            }
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
  const shipping_amount = _.get(estimates, 'cost.shipping_amount', null);
  const base = _.get(estimates, 'materials.base', null);
  const support = _.get(estimates, 'support.base', null);
  const print_time = _.get(estimates, 'print_time', null);

  return { amount, base, currency, print_time, shipping_amount, support };
};

export default connect(mapStateToProps)(OrderEstimates)
