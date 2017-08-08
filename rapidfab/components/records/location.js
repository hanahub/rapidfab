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

const LocationForm = ({ fields, bureaus, handleSubmit, load, submitting, onDelete, users, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item active>
              <Fa name="list" /> <FormattedMessage id="inventory" defaultMessage="Inventory" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/locations">
              <Fa name="map-marker" /> <FormattedMessage id="inventory.locations" defaultMessage="Locations" />
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name="map-marker" /> {fields.id.value || <FormattedMessage id="record.newLocation" defaultMessage="New Location" />}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/locations" bsSize="small">
            <Fa name="arrow-left" /> <FormattedMessage id="inventory.locations" defaultMessage="Locations" />
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
            <BS.ControlLabel>Name:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxAddress">
            <BS.ControlLabel>Address:</BS.ControlLabel>
            <BS.FormControl name="address" type="text" componentClass="textarea" required {...fields.address} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxPhone">
            <BS.ControlLabel>Phone:</BS.ControlLabel>
            <BS.FormControl name="phone" type="tel" {...fields.phone} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxContact">
            <BS.ControlLabel><FormattedMessage id="field.contact" defaultMessage="Contact" />:</BS.ControlLabel>
            <BS.FormControl componentClass="select" placeholder="contact" {...fields.contact}>
              <option key="placeholder" value="" disabled>Select a Contact</option>
              {_.map(users, user => (
                <option key={user.uri} value={user.uri}>{user.username}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>

          <BS.FormGroup style={{ display: 'none' }} controlId="uxBureau">
            <BS.ControlLabel><FormattedMessage id="field.bureau" defaultMessage="Bureau" />:</BS.ControlLabel>
            <BS.FormControl componentClass="select" placeholder="bureau" {...fields.bureau}>
              {_.map(bureaus, bureau => (
                <option key={bureau.uri} value={bureau.uri}>{bureau.uri}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

export default LocationForm;
