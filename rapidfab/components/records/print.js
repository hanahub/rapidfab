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
import ThumbnailPlaceholder from 'rapidfab/images/thumbnail-placeholder.png'

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

const PrintSummary = () => (
  <Panel header="Print Summary">
    <Row>
      <Col xs={6}>
        <Thumbnail src={ThumbnailPlaceholder} />
      </Col>
      <Col xs={6}>
        <ListGroup>
          <ListGroupItem>
            <SpaceBetweenText
              left="Client:"
              right="Greek Embassy"
            />
          </ListGroupItem>
          <ListGroupItem>
            <SpaceBetweenText
              left="Date Ordered:"
              right="3/27/2017"
            />
          </ListGroupItem>
          <ListGroupItem>
            <SpaceBetweenText
              left="Date Delivered:"
              right="3/27/2017"
            />
          </ListGroupItem>
          <ListGroupItem>
            <SpaceBetweenText
              left="Model:"
              right="BigArms.stl"
            />
          </ListGroupItem>
          <ListGroupItem>
            <SpaceBetweenText
              left="Order:"
              right="X45FDT"
            />
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  </Panel>
);

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
SpaceBetweenText.propTypes = { left: PropTypes.string, right: PropTypes.string }

const PrintInfo = () => (
  <Accordion>
    <Panel header="Price Generated" eventKey="1">
      This is the price generated panel.
    </Panel>
    <Panel header="Order Confirmed" eventKey="2">
      This is the order confirmed panel.
    </Panel>
    <Panel header="Model Changed" eventKey="3">
      This is the model changed panel.
    </Panel>
    <Panel header="Build Volume Created" eventKey="4">
      This is the build volume panel.
    </Panel>
    <Panel header="Print Scheduled" eventKey="5">
      This is the print scheduled panel.
    </Panel>
  </Accordion>
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


const PrintComponent = ({ print }) => {
  const breadcrumbs = [{
    href: '#/plan/prints',
    iconName: 'list',
    i18nID: 'plan.prints',
    defaultMessage: 'Print',
  }, {
    iconName: 'list',
    defaultMessage: print.id,
  }];

  return (
    <Grid fluid className="container">

      <BreadcrumbNav breadcrumbs={breadcrumbs}/>
      <ActionToolbar />
      <hr />
      <PrintSummary />
      <PrintInfo />
      <PrintRecord />

    </Grid>
  );
};
PrintComponent.propTypes = { print: PropTypes.object };

export default PrintComponent;
