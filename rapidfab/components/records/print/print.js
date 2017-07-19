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

const PriceChanges = ({ currency, priceEvents }) => (
  <Accordion>
    <Panel
      bsStyle="primary"
      header={
        <div>
          <FormattedMessage
            id="events.prices"
            defaultMessage={`Price Changes (${priceEvents.length})`}
            values={{num: priceEvents.length}}
          />
        </div>
      }
      eventKey="1"
    >
      <Table responsive fill>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="estimates.cost" defaultMessage="Cost" />
            </th>
            <th>
              <FormattedMessage id="field.date" defaultMessage="Date" />
            </th>
          </tr>
        </thead>
        <tbody>
          { priceEvents.map( event => (
            <tr key={event.uuid}>
              <td>
                <FormattedCost
                  currency={currency}
                  value={event.current_value}
                />
              </td>
              <td>
               <FormattedDateTime value={event.created} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Panel>
  </Accordion>
);

const OrderStatusChanges = ({statusEvents}) => (
  <Accordion>
    <Panel
      bsStyle="primary"
      header={
        <div>
          <FormattedMessage
            id="events.orderStatus"
            defaultMessage={`Order Status Changes (${statusEvents.length})`}
            values={{num: statusEvents.length}}
          />
        </div>
      }
      eventKey="1"
    >
      <Table responsive fill>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="field.status" defaultMessage="status" />
            </th>
            <th>
              <FormattedMessage id="field.date" defaultMessage="Date" />
            </th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </Table>
    </Panel>
  </Accordion>
);

const ModelChanges = ({modelEvents}) => (
  <Accordion>
    <Panel
      bsStyle="primary"
      header={
        <div>
          <FormattedMessage
            id="events.model"
            defaultMessage={`Model Changes (${modelEvents.length})`}
            values={{num: modelEvents.length}}
          />
        </div>
      }
      eventKey="1"
      defaultExpanded
    >
      <Table responsive fill>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="field.model" defaultMessage="Model" />
            </th>
            <th>
              <FormattedMessage
                id="field.username"
                defaultMessage="Username"
              />
            </th>
            <th>
              <FormattedMessage id="field.date" defaultMessage="Date" />
            </th>
          </tr>
        </thead>
        <tbody>
          { modelEvents.map( event => (
            <tr key={event.uuid}>
              <td>
               {event.model.name}
              </td>
              <td>
               {event.user.name}
              </td>
              <td>
               <FormattedDateTime value={event.created} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Panel>
  </Accordion>
);

const VolumeChanges = ({ volumeEvents }) => (
  <Accordion>
    <Panel
      bsStyle="primary"
      header={
        <div>
          <FormattedMessage
            id="events.volume"
            defaultMessage={`Volume Changes (${volumeEvents.length})`}
            values={{num: volumeEvents.length}}
          />
        </div>
      }
      eventKey="1"
    >
      <Table responsive fill>
        <thead>
          <tr>
            <th>
              <FormattedMessage
                id="record.material"
                defaultMessage="Material"
              />
            </th>
            <th>
              <FormattedMessage
                id="field.volume"
                defaultMessage="Volume"
              />
            </th>
            <th>
              <FormattedMessage id="field.date" defaultMessage="Date" />
            </th>
          </tr>
        </thead>
        <tbody>
          { volumeEvents.map( event => (
            <tr key={event.uuid}>
              <td>
                { event.key === 'base_material_used' ?
                  <FormattedMessage
                    id="estimates.materialUsed"
                    defaultMessage='Material Used'
                  />
                  :
                  <FormattedMessage
                    id="estimates.supportUsed"
                    defaultMessage='Support Used'
                  />
                }
              </td>
              <td>
                <FormattedVolume value={event.current_value} />
              </td>
              <td>
               <FormattedDateTime value={event.created} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Panel>
  </Accordion>
);

const PrintComponent = ({ print, order, lineItem, model, models, events, users, onExport }) => {
  const breadcrumbs = [ 'prints', print.id ];
  const priceEvents = events.filter(event => event.key === 'amount');
  const statusEvents = events.filter(event => event.key === 'status' );

  const modelEvents = events.filter(event => {
    return event.key === 'model'
  }).map(event => {
    const model = models.find(model => model.uri === event.current_value);
    const user = users.find(user => user.uri === event.user);
    return Object.assign({}, event, { model, user })
  });

  const volumeEvents = events.filter(event => {
    return (
      event.key === 'base_material_used' ||
      event.key === 'support_material_used'
    );
  });


  return (
    <Grid fluid className="container">

      <BreadcrumbNav breadcrumbs={breadcrumbs}/>

      <hr />

      <PrintSummary
        print={print}
        order={order}
        lineItem={lineItem}
        model={model}
      />

      <Feature featureName={'traceability-dev'}>
        <TraceabilityReport print={print} events={events} onExport={onExport}/>
      </Feature>

      { priceEvents.length ?
        <PriceChanges priceEvents={priceEvents} currency={order.currency} />
        : null
      }
      { statusEvents.length ?
        <OrderStatusChanges statusEvents={statusEvents} />
        : null
      }
      { modelEvents.length ?
        <ModelChanges modelEvents={modelEvents} />
        : null
      }
      { volumeEvents.length ?
        <VolumeChanges volumeEvents={volumeEvents} />
        : null
      }

    </Grid>
  );
};

PrintComponent.propTypes = { print: PropTypes.object };

export default PrintComponent;
