import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import Error from 'rapidfab/components/error';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const LocationForm = ({
  fields,
  bureaus,
  handleSubmit,
  onDelete,
  users,
  apiErrors,
}) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav breadcrumbs={['locations', fields.id.value || 'New']} />

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
            <BS.ControlLabel>Name:</BS.ControlLabel>
            <BS.FormControl name="name" type="text" required {...fields.name} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxAddress">
            <BS.ControlLabel>Address:</BS.ControlLabel>
            <BS.FormControl
              name="address"
              type="text"
              componentClass="textarea"
              required
              {...fields.address}
            />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxPhone">
            <BS.ControlLabel>Phone:</BS.ControlLabel>
            <BS.FormControl name="phone" type="tel" {...fields.phone} />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxContact">
            <BS.ControlLabel>
              <FormattedMessage id="field.contact" defaultMessage="Contact" />:
            </BS.ControlLabel>
            <BS.FormControl
              componentClass="select"
              placeholder="contact"
              {...fields.contact}
            >
              <option key="placeholder" value="" disabled>
                Select a Contact
              </option>
              {users.map(user => (
                <option key={user.uri} value={user.uri}>
                  {user.username}
                </option>
              ))}
            </BS.FormControl>
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
              {bureaus.map(bureau => (
                <option key={bureau.uri} value={bureau.uri}>
                  {bureau.uri}
                </option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

export default LocationForm;
