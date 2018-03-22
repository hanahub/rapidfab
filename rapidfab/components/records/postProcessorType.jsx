import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const PostProcessorTypeForm = ({
  fields,
  handleSubmit,
  onDelete,
  manufacturers,
  materials,
}) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav
        breadcrumbs={['postProcessorTypes', fields.id.value || 'New']}
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

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel>
              <FormattedMessage id="field.name" defaultMessage="Name" />:
            </BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxDescription">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.description"
                defaultMessage="Description"
              />:
            </BS.ControlLabel>
            <BS.FormControl
              name="description"
              type="text"
              {...fields.description}
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCost">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.costPerMinute"
                defaultMessage="Cost Per Minute"
              />:
            </BS.ControlLabel>
            <BS.FormControl
              name="cost"
              type="number"
              {...fields.cost}
              required
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxDuration">
            <BS.ControlLabel>Duration (seconds):</BS.ControlLabel>
            <BS.FormControl
              name="duration"
              type="number"
              required
              {...fields.duration}
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxMaterials">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.materials"
                defaultMessage="Materials"
              />:
            </BS.ControlLabel>
            <BS.FormControl
              componentClass="select"
              multiple
              required
              {...fields.materials}
            >
              {materials.map(material => (
                <option key={material.uri} value={material.uri}>
                  {material.name}
                </option>
              ))}
            </BS.FormControl>
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
              placeholder="manufacturer"
              required
              {...fields.manufacturer}
            >
              <option key="placeholder" value="" selected disabled>
                Select a Manufacturer
              </option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.uri} value={manufacturer.uri}>
                  {manufacturer.name}
                </option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

PostProcessorTypeForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  manufacturers: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostProcessorTypeForm;
