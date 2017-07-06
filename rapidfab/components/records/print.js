import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
} from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/breadcrumbNav';
import SaveButton from 'rapidfab/components/saveButton';
import ModelThumbnail from 'rapidfab/components/ModelThumbnail';

const ActionToolbar = () => (
  <ButtonToolbar className="clearfix">
    <div className="pull-right">
      <ExportButton />
      <SaveButton />
    </div>
  </ButtonToolbar>
);

const ExportButton = () => (
  <Button bsStyle="primary" bsSize="small">
    Export
  </Button>
);

const PrintSummary = ({ print, order, lineItem, model , events }) => {
  const { status } = print;
  const {
    created,
  } = lineItem;
  const {
    name,
    uuid,
  } = order;
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
                  <span>Order:</span>
                </div>
                <div className="pull-right">
                  <a href={`#/records/order/${uuid}`}>{name}</a>
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <SpaceBetweenText
                left="Status:"
                right={status}
              />
            </ListGroupItem>
            <ListGroupItem>
              <SpaceBetweenText
                left="Created:"
                right={created}
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


const PrintComponent = ({ print, order, lineItem, model, events }) => {
  const breadcrumbs = [ "prints", print.id ];

  return (
    <Grid fluid className="container">

      <BreadcrumbNav breadcrumbs={breadcrumbs}/>
      <ActionToolbar />
      <hr />
      <PrintSummary print={print} order={order} lineItem={lineItem} model={model} />

    </Grid>
  );
};
PrintComponent.propTypes = { print: PropTypes.object };

export default PrintComponent;
