import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';
import Error                  from 'rapidfab/components/error'


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const ManufacturerForm = ({ fields, handleSubmit, load, submitting, onDelete, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item>
              <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/manufacturers">
              <Fa name='industry'/> <FormattedMessage id="inventory.manufacturers" defaultMessage='Manufacturers'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='industry'/> {fields.id.value || <FormattedMessage id="record.manufacturer.new" defaultMessage='New Manufacturer'/>}
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
            <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
              <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uuid.value)} disabled={!fields.id.value}>
                <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
              </BS.MenuItem>
            </BS.SplitButton>
          </BS.ButtonToolbar>
        </BS.Col>
      </BS.Row>

      <hr/>

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors}/>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel>Name:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCommercialContact">
            <BS.ControlLabel>Commercial Contact:</BS.ControlLabel>
            <BS.FormControl name="commercialContact" type="text" required {...fields.contact.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCommercialPhone">
            <BS.ControlLabel>Commercial Phone:</BS.ControlLabel>
            <BS.FormControl name="commercialPhone" type="tel" required {...fields.contact.phone}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxSupportContact">
            <BS.ControlLabel>Support Contact:</BS.ControlLabel>
            <BS.FormControl name="supportContact" type="text" required {...fields.support.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxSupportPhone">
            <BS.ControlLabel>Support Phone:</BS.ControlLabel>
            <BS.FormControl name="supportPhone" type="tel" required {...fields.support.phone}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxAddress">
            <BS.ControlLabel>Address:</BS.ControlLabel>
            <BS.FormControl name="address" type="text" componentClass="textarea" required {...fields.address}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxNotes">
            <BS.ControlLabel>Notes:</BS.ControlLabel>
            <BS.FormControl name="notes" type="text" componentClass="textarea" required {...fields.notes}/>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
)

export default ManufacturerForm
