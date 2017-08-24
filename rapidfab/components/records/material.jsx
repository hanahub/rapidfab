import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';

import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const MaterialForm = ({
  fields,
  bureaus,
  handleSubmit,
  onDelete,
  manufacturers,
  apiErrors,
}) =>
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item active>
              <Fa name="list" />{' '}
              <FormattedMessage id="inventory" defaultMessage="Inventory" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/materials">
              <Fa name="object-group" />{' '}
              <FormattedMessage
                id="inventory.materials"
                defaultMessage="Materials"
              />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name="object-ungroup" />{' '}
              {fields.id.value ||
                <FormattedMessage
                  id="record.material.new"
                  defaultMessage="New Material"
                />}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/materials" bsSize="small">
            <Fa name="arrow-left" />{' '}
            <FormattedMessage
              id="inventory.materials"
              defaultMessage="Materials"
            />
          </BS.Button>
        </BS.Col>
        <BS.Col xs={6}>
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
              {_.map(manufacturers, manufacturer =>
                <option
                  key={manufacturer.uri}
                  value={manufacturer.uri}
                >{`${manufacturer.id} - ${manufacturer.name}`}</option>
              )}
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
          <BS.FormGroup style={{ display: 'none' }} controlId="uxBureau">
            <BS.ControlLabel>
              <FormattedMessage id="field.bureau" defaultMessage="Bureau" />:
            </BS.ControlLabel>
            <BS.FormControl
              componentClass="select"
              placeholder="bureau"
              {...fields.bureau}
            >
              {_.map(bureaus, bureau =>
                <option key={bureau.uri} value={bureau.uri}>
                  {bureau.uri}
                </option>
              )}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>;

export default MaterialForm;
