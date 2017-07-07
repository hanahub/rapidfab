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
import SaveButton from 'rapidfab/components/saveButton';
import ModelThumbnail from 'rapidfab/components/ModelThumbnail';
import {
  FormattedCost,
  FormattedDateTime,
  FormattedMessage,
  FormattedVolume
} from 'rapidfab/i18n';

const PrintSummary = ({ print, order, lineItem, model , events }) => {
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
                right={<FormattedDateTime value={created} /> }
              />
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Panel>
  )
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
            <FormattedMessage id={"field.uploadDocument"} defaultMessage={"Upload Document"}/>:
          </ControlLabel>
          <FormControl type="file" name="file"/>
        </FormGroup>

        <FormGroup>
          <ControlLabel>
            <FormattedMessage id={"field.notes"} defaultMessage={"Notes"}/>:
          </ControlLabel>
          <FormControl componentClass="textarea" name="notes"/>
        </FormGroup>

        <FormGroup>
          <Radio inline value="success" >
            <FormattedMessage id={"field.success"} defaultMessage={"Success"}/>
          </Radio>
          <Radio inline value="fail" >
            <FormattedMessage id={"field.fail"} defaultMessage={"Fail"}/>
          </Radio>
        </FormGroup>

      </Col>
    </Row>
  </Panel>
);

const OrderConfirmed = ({statusEvents}) => (
  <Accordion>
    <Panel bsStyle="primary" header="Order Status Changed" eventKey="1">
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        { statusEvents.map( event => (
            <tr key={event.uuid}>
              <td>
               {ORDER_STATUS_MAP[event.current_value]}
              </td>
              <td>
               <FormattedDateTime value={event.created} />
              </td>
            </tr>
        ))}
      </Table>
    </Panel>
  </Accordion>
);

const ModelChanged = ({modelEvents}) => (
  <Accordion>
    <Panel bsStyle="primary" header="Model Changed" eventKey="1">
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Model Name</th>
            <th>User</th>
            <th>Created</th>
          </tr>
        </thead>
        { modelEvents.map( event => (
            <tr key={event.uuid}>
              <td>
               {event.model.name}
              </td>
              <td>
               {event.userObj.name}
              </td>
              <td>
               <FormattedDateTime value={event.created} />
              </td>
            </tr>
        ))}
      </Table>
    </Panel>
  </Accordion>
);

const BuildVolumeCreated = () => (
  <Accordion>
    <Panel bsStyle="primary" header="Build Volume Created" eventKey="1">
      <ListGroup fill>
        <ListGroupItem>
          <div className="clearfix">
            <div className="pull-left">
              <span>Price Generated:</span>
            </div>
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <SpaceBetweenText
            left="Order Confirmed:"

          />
        </ListGroupItem>
        <ListGroupItem>
          <SpaceBetweenText
            left="Created:"

          />
        </ListGroupItem>
      </ListGroup>
    </Panel>
  </Accordion>
);

const PriceGenerated = () => (
  <Accordion>
    <Panel bsStyle="primary" header="Price Generated" eventKey="1">
      <ListGroup fill>
        <ListGroupItem>
          <div className="clearfix">
            <div className="pull-left">
              <span>Price Generated:</span>
            </div>
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <SpaceBetweenText
            left="Order Confirmed:"

          />
        </ListGroupItem>
        <ListGroupItem>
          <SpaceBetweenText
            left="Created:"

          />
        </ListGroupItem>
      </ListGroup>
    </Panel>
  </Accordion>
);

const PrintComponent = ({ print, order, lineItem, model, models, events, users }) => {
  const breadcrumbs = [ 'prints', print.id ];

  const statusEvents = events.filter(event => {
    return event.key === 'status'
  })

  const modelEvents = events.filter(event => {
    return event.key === 'model'
  }).map(event => {
    const model = models.find(model => model.uri === event.current_value);
    const user = users.find(user => user.uri === event.user);
    return Object.assign({}, event, { model, userObj: user })
  })

  return (
    <Grid fluid className="container">

      <BreadcrumbNav breadcrumbs={breadcrumbs}/>

      <hr />
      <PrintSummary print={print} order={order} lineItem={lineItem} model={model} />
      <PriceGenerated />
      <OrderConfirmed statusEvents={statusEvents} />
      <ModelChanged modelEvents={modelEvents} />
      <BuildVolumeCreated />
    </Grid>
  );
};
PrintComponent.propTypes = { print: PropTypes.object };

export default PrintComponent;
