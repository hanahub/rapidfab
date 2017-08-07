import React, { PropTypes } from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';


const SaveButtonTitle = ({ }) => (
  <span>
    <Fa name="floppy-o" /> <FormattedMessage id="button.save" defaultMessage="Save" />
  </span>
);

const StockForm = ({ fields, handleSubmit, load, submitting, onDelete, locations, materials, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item active>
              <Fa name="list" /> <FormattedMessage id="inventory" defaultMessage="Inventory" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/stocks">
              <Fa name="tags" /> <FormattedMessage id="inventory.materialStocks" defaultMessage="Material Stocks" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name="tags" /> {fields.id.value || <FormattedMessage id="record.materialStock.new" defaultMessage="New Material Stock" />}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/stocks" bsSize="small">
            <Fa name="arrow-left" /> <FormattedMessage id="inventory.materialStocks" defaultMessage="Material Stocks" />
          </BS.Button>
        </BS.Col>
        <BS.Col xs={6}>
          <BS.Button className="pull-right" type="submit" bsStyle="success" bsSize="small"><SaveButtonTitle /></BS.Button>
        </BS.Col>
      </BS.Row>

      <hr />

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors} />
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxMaterial">
            <BS.ControlLabel><FormattedMessage id="field.material" defaultMessage="Material" />:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.material}>
              <option key="placeholder" value="" selected disabled>Select a Material</option>
              {_.map(materials, material => (
                <option key={material.uri} value={material.uri}>{`${material.id} - ${material.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxLocation">
            <BS.ControlLabel><FormattedMessage id="field.location" defaultMessage="Location" />:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.location}>
              <option key="placeholder" value="" selected disabled>Select a Location</option>
              {_.map(locations, location => (
                <option key={location.uri} value={location.uri}>{`${location.id} - ${location.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxStatus">
            <BS.ControlLabel><FormattedMessage id="field.status" defaultMessage="Status" />:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.status}>
              <option value="in-use"><FormattedMessage id="status.inUse" defaultMessage="In Use" /></option>
              <option value="available"><FormattedMessage id="status.available" defaultMessage="Available" /></option>
              <option value="exhausted"><FormattedMessage id="status.exhausted" defaultMessage="Exhausted" /></option>
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxQuantity">
            <BS.ControlLabel><FormattedMessage id="field.quantity" defaultMessage="Quantity" />:</BS.ControlLabel>
            <BS.FormControl type="number" required {...fields.quantity} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxUnits">
            <BS.ControlLabel><FormattedMessage id="field.units" defaultMessage="Units" />:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.units}>
              <option value="cm3"><FormattedMessage id="field.units.cm3" defaultMessage="cm3" /></option>
              <option value="grams"><FormattedMessage id="field.units.grams" defaultMessage="Grams" /></option>
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

export default StockForm;
