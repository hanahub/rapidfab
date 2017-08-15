import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Grid,
  ListGroup,
  ListGroupItem,
  Panel,
  Row,
} from 'react-bootstrap';

import { RUN_STATUS_MAP } from 'rapidfab/mappings';

import { FormattedDateTime, FormattedMessage, } from 'rapidfab/i18n';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import ModelThumbnail from 'rapidfab/components/ModelThumbnail';
import TraceabilityReport from './TraceabilityReport';
import ProcessSteps from './ProcessSteps';

const PrintSummary = ({ print, processSteps, order, lineItem, model }) => {
  const { status } = print;
  const { created } = lineItem;
  const { name, uuid } = order;
  return (
    <Panel header="Print Summary">
      <Row>
        <Col xs={6}>
          <ModelThumbnail snapshot={model.snapshot_content} />
        </Col>
        <Col xs={6}>
          <ListGroup>
            <ListGroupItem>
              <div className="clearfix">
                <div className="pull-left">
                  <span>
                    <FormattedMessage
                      id="field.order"
                      defaultMessage="Order"
                    />:
                  </span>
                </div>
                <div className="pull-right">
                  <a href={`#/records/order/${uuid}`}>{name}</a>
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <SpaceBetweenText
                left={
                  <FormattedMessage
                    id="field.status"
                    defaultMessage="Status"
                  />
                }
                right={RUN_STATUS_MAP[status]}
              />
            </ListGroupItem>
            <ListGroupItem>
              <SpaceBetweenText
                left={
                  <FormattedMessage
                    id="status.created"
                    defaultMessage="Created"
                  />
                }
                right={<FormattedDateTime value={created} />}
              />
            </ListGroupItem>
          </ListGroup>

          <ProcessSteps processSteps={processSteps} />
        </Col>
      </Row>
    </Panel>
  );
};

const SpaceBetweenText = ({ left, right }) => (
  <div className="clearfix">
    <div className="pull-left">
      {left}
    </div>
    <div className="pull-right">
      {right}
    </div>
  </div>
);

const PrintComponent = ({ print, processSteps, order, lineItem, model, onExport }) => {
  const breadcrumbs = ['prints', print.id];

  return (
    <Grid fluid className="container">

      <BreadcrumbNav breadcrumbs={breadcrumbs} />

      <hr />

      <PrintSummary
        print={print}
        processSteps={processSteps}
        order={order}
        lineItem={lineItem}
        model={model}
      />

      <TraceabilityReport onExport={onExport} />

    </Grid>
  );
};

PrintComponent.propTypes = { print: PropTypes.object };

export default PrintComponent;
