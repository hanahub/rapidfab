import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';
import { reduxForm }            from 'redux-form';

const SaveButtonTitle = ({ uri, uuid, record }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const ManufacturerForm = ({ uuid, record, fetching, errors, onSave, onDelete }) => (
  <BS.Grid>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb>
          <BS.Breadcrumb.Item href="#/inventory">
            <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="#/inventory/manufacturer">
            <Fa name='industry'/> <FormattedMessage id="inventory.manufacturers" defaultMessage='Manufacturers'/>
          </BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item>
            <Fa name='industry'/> {uuid || <FormattedMessage id="record.newManufacturer" defaultMessage='New Manufacturer'/>}
          </BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>

    <BS.Row>
      <BS.Col xs={6}>
        <BS.Button href="#/inventory/manufacturers" bsSize="small">
          <Fa name='arrow-left'/> <FormattedMessage id="inventory.manufacturers" defaultMessage='Manufacturers'/>
        </BS.Button>
      </BS.Col>
      <BS.Col xs={6}>
        <BS.ButtonToolbar className="pull-right">
          <BS.SplitButton id="uxSaveDropdown" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
            <BS.MenuItem eventKey={1}>
              <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
            </BS.MenuItem>
          </BS.SplitButton>
        </BS.ButtonToolbar>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.FormGroup controlId="uxName">
          <BS.ControlLabel>Name:</BS.ControlLabel>
          <BS.FormControl name="name" componentClass="text"/>
        </BS.FormGroup>
        <BS.FormGroup controlId="uxCommercialContact">
          <BS.ControlLabel>Commercial Contact:</BS.ControlLabel>
          <BS.FormControl name="commercialContact" componentClass="text"/>
        </BS.FormGroup>
        <BS.FormGroup controlId="uxCommercialPhone">
          <BS.ControlLabel>Commercial Phone:</BS.ControlLabel>
          <BS.FormControl name="commercialPhone" componentClass="tel"/>
        </BS.FormGroup>
        <BS.FormGroup controlId="uxSupportContact">
          <BS.ControlLabel>Support Contact:</BS.ControlLabel>
          <BS.FormControl name="supportContact" componentClass="text"/>
        </BS.FormGroup>
        <BS.FormGroup controlId="uxSupportPhone">
          <BS.ControlLabel>Support Phone:</BS.ControlLabel>
          <BS.FormControl name="supportPhone" componentClass="tel"/>
        </BS.FormGroup>
        <BS.FormGroup controlId="uxAddress">
          <BS.ControlLabel>Address:</BS.ControlLabel>
          <BS.FormControl name="address" componentClass="textarea"/>
        </BS.FormGroup>
        <BS.FormGroup controlId="uxNotes">
          <BS.ControlLabel>Notes:</BS.ControlLabel>
          <BS.FormControl name="notes" componentClass="textarea"/>
        </BS.FormGroup>
      </BS.Col>
    </BS.Row>
  </BS.Grid>
)

export default ManufacturerForm
