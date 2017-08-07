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

const PrinterTypeForm = ({ fields, handleSubmit, load, submitting, onDelete, printerTypes, manufacturers, materials, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item active>
              <Fa name="list" /> <FormattedMessage id="inventory" defaultMessage="Inventory" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/printer-types">
              <Fa name="print" /> <FormattedMessage id="inventory.printerTypes" defaultMessage="Printer Types" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name="print" /> {fields.id.value || <FormattedMessage id="record.printerType.new" defaultMessage="New Printer Type" />}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/printer-types" bsSize="small">
            <Fa name="arrow-left" /> <FormattedMessage id="inventory.printerTypes" defaultMessage="Printer Types" />
          </BS.Button>
        </BS.Col>
        <BS.Col xs={6}>
          <BS.ButtonToolbar className="pull-right">
            <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
              <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uuid.value)} disabled={!fields.id.value}>
                <Fa name="ban" /> <FormattedMessage id="button.delete" defaultMessage="Delete" />
              </BS.MenuItem>
            </BS.SplitButton>
          </BS.ButtonToolbar>
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
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage="Name" />:</BS.ControlLabel>
            <BS.FormControl type="text" required {...fields.name} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxDescription">
            <BS.ControlLabel><FormattedMessage id="field.description" defaultMessage="Description" />:</BS.ControlLabel>
            <BS.FormControl componentClass="textarea" {...fields.description} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxBuildVolumeX">
            <BS.ControlLabel><FormattedMessage id="field.buildVolumeX" defaultMessage="Build Volume X" />:</BS.ControlLabel>
            <BS.FormControl type="number" required {...fields.build_volume.x} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxBuildVolumeY">
            <BS.ControlLabel><FormattedMessage id="field.buildVolumeY" defaultMessage="Build Volume Y" />:</BS.ControlLabel>
            <BS.FormControl type="number" required {...fields.build_volume.y} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxBuildVolumeZ">
            <BS.ControlLabel><FormattedMessage id="field.buildVolumeZ" defaultMessage="Build Volume Z" />:</BS.ControlLabel>
            <BS.FormControl type="number" required {...fields.build_volume.z} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxManufacturer">
            <BS.ControlLabel><FormattedMessage id="field.manufacturer" defaultMessage="Manufacturer" />:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.manufacturer}>
              <option key="placeholder" value="" selected disabled>Select a Manufacturer</option>
              {_.map(manufacturers, manufacturer => (
                <option key={manufacturer.uri} value={manufacturer.uri}>{`${manufacturer.id} - ${manufacturer.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxMaterials">
            <BS.ControlLabel><FormattedMessage id="field.materials" defaultMessage="Materials" />:</BS.ControlLabel>
            <BS.FormControl componentClass="select" multiple required {...fields.materials}>
              {_.map(materials, material => (
                <option key={material.uri} value={material.uri}>{`${material.id} - ${material.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

export default PrinterTypeForm;
