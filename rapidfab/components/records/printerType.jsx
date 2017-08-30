import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const PrinterTypeForm = ({
  fields,
  handleSubmit,
  onDelete,
  manufacturers,
  materials,
}) =>
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav
        breadcrumbs={['printerTypes', fields.id.value || 'newPrinterType']}
      />

      <div className="clearfix">
        <BS.ButtonToolbar className="pull-right">
          <BS.SplitButton
            id="uxSaveDropdown"
            type="submit"
            bsStyle="success"
            bsSize="small"
            title={<SaveButtonTitle />}
            pullRight
          >
            <BS.MenuItem
              eventKey={1}
              onClick={() => onDelete(fields.uuid.value)}
              disabled={!fields.id.value}
            >
              <Fa name="ban" />{' '}
              <FormattedMessage id="button.delete" defaultMessage="Delete" />
            </BS.MenuItem>
          </BS.SplitButton>
        </BS.ButtonToolbar>
      </div>

      <hr />

      <FlashMessages />

      <BS.FormGroup controlId="uxName">
        <BS.ControlLabel>
          <FormattedMessage id="field.name" defaultMessage="Name" />:
        </BS.ControlLabel>
        <BS.FormControl type="text" required {...fields.name} />
      </BS.FormGroup>
      <BS.FormGroup controlId="uxDescription">
        <BS.ControlLabel>
          <FormattedMessage
            id="field.description"
            defaultMessage="Description"
          />:
        </BS.ControlLabel>
        <BS.FormControl componentClass="textarea" {...fields.description} />
      </BS.FormGroup>
      <BS.FormGroup controlId="uxBuildVolumeX">
        <BS.ControlLabel>
          <FormattedMessage
            id="field.buildVolumeX"
            defaultMessage="Build Volume X in Millimeters"
          />:
        </BS.ControlLabel>
        <BS.FormControl type="number" required {...fields.build_volume.x} />
      </BS.FormGroup>
      <BS.FormGroup controlId="uxBuildVolumeY">
        <BS.ControlLabel>
          <FormattedMessage
            id="field.buildVolumeY"
            defaultMessage="Build Volume Y in Millimeters"
          />:
        </BS.ControlLabel>
        <BS.FormControl type="number" required {...fields.build_volume.y} />
      </BS.FormGroup>
      <BS.FormGroup controlId="uxBuildVolumeZ">
        <BS.ControlLabel>
          <FormattedMessage
            id="field.buildVolumeZ"
            defaultMessage="Build Volume Z in Millimeters"
          />:
        </BS.ControlLabel>
        <BS.FormControl type="number" required {...fields.build_volume.z} />
      </BS.FormGroup>
      <BS.FormGroup controlId="uxManufacturer">
        <BS.ControlLabel>
          <FormattedMessage
            id="field.manufacturer"
            defaultMessage="Manufacturer"
          />:
        </BS.ControlLabel>
        <BS.FormControl
          componentClass="select"
          required
          {...fields.manufacturer}
        >
          <option key="placeholder" value="" selected disabled>
            Select a Manufacturer
          </option>
          {manufacturers.map(manufacturer =>
            <option
              key={manufacturer.uri}
              value={manufacturer.uri}
            >{`${manufacturer.id} - ${manufacturer.name}`}</option>
          )}
        </BS.FormControl>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxMaterials">
        <BS.ControlLabel>
          <FormattedMessage id="field.materials" defaultMessage="Materials" />:
        </BS.ControlLabel>
        <BS.FormControl
          componentClass="select"
          multiple
          required
          {...fields.materials}
        >
          {materials.map(material =>
            <option
              key={material.uri}
              value={material.uri}
            >{`${material.id} - ${material.name}`}</option>
          )}
        </BS.FormControl>
      </BS.FormGroup>
    </BS.Grid>
  </form>;

PrinterTypeForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  materials: PropTypes.arrayOf(PropTypes.obj),
  manufacturers: PropTypes.arrayOf(PropTypes.obj),
  onDelete: PropTypes.func.isRequired,
};

PrinterTypeForm.defaultProps = { materials: [], manufacturers: [] };

export default PrinterTypeForm;
