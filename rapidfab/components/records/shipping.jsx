import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';

const SaveButtonTitle = ({}) =>
  <span>
    <Fa name="floppy-o" />{' '}
    <FormattedMessage id="button.save" defaultMessage="Save" />
  </span>;

const ShippingForm = ({ fields, bureaus, handleSubmit, onDelete, apiErrors }) =>
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item active>
              <Fa name="list" />{' '}
              <FormattedMessage id="inventory" defaultMessage="Inventory" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/shipping">
              <Fa name="truck" />{' '}
              <FormattedMessage id="work.shipping" defaultMessage="Shipping" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name="truck" />{' '}
              {fields.id.value ||
                <FormattedMessage
                  id="record.shipping.new"
                  defaultMessage="New Shipping"
                />}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/shipping" bsSize="small">
            <Fa name="arrow-left" />{' '}
            <FormattedMessage id="work.shipping" defaultMessage="Shipping" />
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
          <BS.FormGroup controlId="uxRegion">
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
                {...fields.description}
              />
            </BS.FormGroup>
            <BS.ControlLabel>Region:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.region}>
              <option key="placeholder" value="" selected disabled>
                Select a Region
              </option>
              <option value="africa">Africa</option>
              <option value="antarctica">Antarctica</option>
              <option value="asia">Asia</option>
              <option value="australia">Australia</option>
              <option value="europe">Europe</option>
              <option value="north-america">North America</option>
              <option value="south-america">South America</option>
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxCost">
            <BS.ControlLabel>Cost:</BS.ControlLabel>
            <BS.FormControl
              name="cost"
              type="number"
              required
              {...fields.cost}
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

export default ShippingForm;
