import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Panel,
  ListGroup,
  ListGroupItem,
  Thumbnail,
  Row,
} from 'react-bootstrap';

import hhmmss from 'rapidfab/utils/hhmmss';
import {
  FormattedCost,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';
import exampleSnapshot from 'rapidfab/images/example_snapshot.png';

const bureauCost = (
  baseMaterialUsed,
  constantOverhead,
  materialCostScaleFactor,
  printTime,
  printCostScaleFactor,
  runningCostPerHour
) => {
  // nautilus/platform/line_item.py _maybe_calculate_bureau_custom_cost
  const printTimeHours = printTime / 3600;
  const cost1 = printCostScaleFactor * printTimeHours * runningCostPerHour;
  const cost2 = materialCostScaleFactor * baseMaterialUsed * 0.1;
  return cost1 + cost2 + constantOverhead;
};

const ExampleEstimates = ({
  currency,
  estimates,
  model,
  quantity,
  runningCostPerHour,
  materialCostScaleFactor,
  printCostScaleFactor,
  constantOverhead,
}) => (
  <Panel header="Example Estimates">
    <Row>
      <Col xs={8} xsOffset={2} lg={4} lgOffset={4}>
        <Thumbnail src={exampleSnapshot} />
      </Col>
    </Row>
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
                    <FormattedMessage id="notAvailable" defaultMessage="N/A" />
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
                    <FormattedMessage id="notAvailable" defaultMessage="N/A" />
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
                id="estimates.printingCost"
                defaultMessage="Printing Cost"
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
              <FormattedCost
                currency={currency}
                value={bureauCost(
                  estimates.materials.base,
                  constantOverhead,
                  materialCostScaleFactor,
                  estimates.print_time,
                  printCostScaleFactor,
                  runningCostPerHour
                )}
              />
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Panel>
  </Panel>
);

ExampleEstimates.defaultProps = {
  currency: 'USD',
  estimates: {
    print_time: 10000,
    amount: 10,
    post_processing_cost: 10,
    materials: {
      base: 1000,
      support: 10,
    },
  },
  model: {
    volume_mm: 100000,
  },
  quantity: 1,
};

ExampleEstimates.propTypes = {
  currency: PropTypes.string,
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
  runningCostPerHour: PropTypes.number.isRequired,
  printCostScaleFactor: PropTypes.number.isRequired,
  materialCostScaleFactor: PropTypes.number.isRequired,
  constantOverhead: PropTypes.number.isRequired,
};

export default ExampleEstimates;
