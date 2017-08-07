import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Button,
  ButtonToolbar,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  ListGroup,
  ListGroupItem,
  Panel,
  Radio,
  Row,
  Thumbnail,
  Table,
} from 'react-bootstrap';

import { ORDER_STATUS_MAP, RUN_STATUS_MAP } from 'rapidfab/mappings';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import Feature from 'rapidfab/components/Feature';
import SaveButton from 'rapidfab/components/saveButton';
import ModelThumbnail from 'rapidfab/components/ModelThumbnail';
import TraceabilityReport from './TraceabilityReport';
import ProcessSteps from './ProcessSteps';
import {
  FormattedCost,
  FormattedDateTime,
  FormattedMessage,
  FormattedVolume,
} from 'rapidfab/i18n';

const PrintSummary = ({ print, processSteps, order, lineItem, model, events }) => {
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

const PrintRecord = () => (
  <Panel header="Print Record">
    <Row>
      <Col xs={12}>

        <FormGroup>
          <ControlLabel>
            <FormattedMessage id={'field.uploadDocument'} defaultMessage={'Upload Document'} />:
          </ControlLabel>
          <FormControl type="file" name="file" />
        </FormGroup>

        <FormGroup>
          <ControlLabel>
            <FormattedMessage id={'field.notes'} defaultMessage={'Notes'} />:
          </ControlLabel>
          <FormControl componentClass="textarea" name="notes" />
        </FormGroup>

        <FormGroup>
          <Radio inline value="success" >
            <FormattedMessage id={'field.success'} defaultMessage={'Success'} />
          </Radio>
          <Radio inline value="fail" >
            <FormattedMessage id={'field.fail'} defaultMessage={'Fail'} />
          </Radio>
        </FormGroup>

      </Col>
    </Row>
  </Panel>
);

const PrintComponent = ({ print, processSteps, order, lineItem, model, models, events, users, onExport }) => {
  const breadcrumbs = ['prints', print.id];
  const priceEvents = events.filter(event => event.key === 'amount');
  const statusEvents = events.filter(event => event.key === 'status');

  const modelEvents = events.filter(event => event.key === 'model').map((event) => {
    const model = models.find(model => model.uri === event.current_value);
    const user = users.find(user => user.uri === event.user);
    return Object.assign({}, event, { model, user });
  });

  const volumeEvents = events.filter(event => (
    event.key === 'base_material_used' ||
      event.key === 'support_material_used'
  ));


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
