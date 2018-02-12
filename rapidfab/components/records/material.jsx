import React from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';

import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';
import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';

const MaterialForm = ({
  fields,
  handleSubmit,
  onDelete,
  manufacturers,
  apiErrors,
}) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav breadcrumbs={['materials', fields.id.value || 'New']} />

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

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors} />
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={12}>
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
            <BS.FormControl
              componentClass="textarea"
              required
              {...fields.description}
            />
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
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.uri} value={manufacturer.uri}>{`${
                  manufacturer.id
                } - ${manufacturer.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxColor">
            <BS.ControlLabel>Color:</BS.ControlLabel>
            <BS.FormControl type="text" required {...fields.color} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxType">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.materialType"
                defaultMessage="Material Type"
              />:
            </BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.type}>
              <option key="placeholder" value="" selected disabled>
                Select a Material Type
              </option>
              <option value="base">Base</option>
              <option value="support">Support</option>
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxUnits">
            <BS.ControlLabel>
              <FormattedMessage id="field.units" defaultMessage="Units" />:
            </BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.units}>
              <option value="cm3">
                <FormattedMessage id="field.units.cm3" defaultMessage="cm3" />
              </option>
              <option value="grams">
                <FormattedMessage
                  id="field.units.grams"
                  defaultMessage="Grams"
                />
              </option>
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCost">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.costPerCC"
                defaultMessage="Cost Per CC"
              />:
            </BS.ControlLabel>
            <BS.FormControl type="number" required {...fields.cost} />
          </BS.FormGroup>
          <BS.Checkbox {...fields.third_party_fulfillment}>
            <FormattedMessage
              id="field.fullfilledByThirdParty"
              defaultMessage="Fullfilled by Third Party"
            />
          </BS.Checkbox>
          <BS.FormGroup controlId="uxProcessingTime">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.processingTime"
                defaultMessage="Processing Time"
              />:
            </BS.ControlLabel>
            <BS.FormControl
              type="number"
              required
              {...fields.post_processing_seconds}
            />
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

MaterialForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  manufacturers: PropTypes.arrayOf(PropTypes.object).isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MaterialForm;
