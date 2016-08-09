import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const MaterialForm = ({ fields, handleSubmit, load, submitting, onDelete, manufacturers }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item href="#/inventory">
              <Fa name='book'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/materials">
              <Fa name='object-group'/> <FormattedMessage id="inventory.materials" defaultMessage='Materials'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='object-ungroup'/> {fields.id.value || <FormattedMessage id="record.newMaterial" defaultMessage='New Material'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/materials" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.materials" defaultMessage='Materials'/>
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
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
            <BS.FormControl type="text" required {...fields.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxDescription">
            <BS.ControlLabel><FormattedMessage id="field.description" defaultMessage='Description'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="textarea" required {...fields.description}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxManufacturer">
            <BS.ControlLabel><FormattedMessage id="field.manufacturer" defaultMessage='Manufacturer'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.manufacturer}>
              {_.map(manufacturers, manufacturer => (
                <option key={manufacturer.uri} value={manufacturer.uri}>{`${manufacturer.id} - ${manufacturer.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxColor">
            <BS.ControlLabel>Color:</BS.ControlLabel>
            <BS.FormControl type="text" required {...fields.color}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxType">
            <BS.ControlLabel><FormattedMessage id="field.materialType" defaultMessage='Material Type'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.type}>
              <option value="base">Base</option>
              <option value="support">Support</option>
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxRetailPriceCurrency">
            <BS.ControlLabel>Retail Price Currency:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.retail_price.currency}>
              <option value="USD">USD</option>
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxRetailPrice">
            <BS.ControlLabel><FormattedMessage id="field.retailPrice" defaultMessage='Retail Price'/>:</BS.ControlLabel>
            <BS.FormControl type="number" required {...fields.retail_price.amount}/>
          </BS.FormGroup>
          <BS.Checkbox {...fields.third_party_fulfillment}>
            <FormattedMessage id="field.fullfilledByThirdParty" defaultMessage='Fullfilled by Third Party'/>
          </BS.Checkbox>
          <BS.FormGroup controlId="uxProcessingTime">
            <BS.ControlLabel><FormattedMessage id="field.processingTime" defaultMessage='Processing Time'/>:</BS.ControlLabel>
            <BS.FormControl type="number" required {...fields.post_processing_seconds}/>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
)

export default MaterialForm
