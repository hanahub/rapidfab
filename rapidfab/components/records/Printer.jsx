import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const Printer = ({
  handleSubmit,
  handleInputChange,
  handleDelete,
  printerType,
  printerTypes,
  location,
  locations,
  modeler,
  name,
  uuid,
}) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav breadcrumbs={['printers', uuid || 'New']} />
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
              onClick={handleDelete}
              disabled={!uuid}
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
            <BS.FormControl type="text" required />
          </BS.FormGroup>
          <BS.FormGroup controlId="uxPrinterType">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.printerType"
                defaultMessage="Printer Type"
              />:
            </BS.ControlLabel>
            <BS.FormControl
              componentClass="select"
              required
            >
              <option key="placeholder" value="" selected disabled>
                Select a Printer Type
              </option>
              {printerTypes.map(printerType => (
                <option
                  key={printerType.uri}
                  value={printerType.uri}
                >{`${printerType.id} - ${printerType.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxLocation">
            <BS.ControlLabel>
              <FormattedMessage
                id="field.location"
                defaultMessage="Location"
              />:
            </BS.ControlLabel>
            <BS.FormControl
              componentClass="select"
              required
            >
              <option key="placeholder" value="" selected disabled>
                Select a Location
              </option>
              {locations.map(location => (
                <option
                  key={location.uri}
                  value={location.uri}
                >{`${location.id} - ${location.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxModeler">
            <BS.ControlLabel>
              <FormattedMessage id="field.modeler" defaultMessage="Modeler" />:
            </BS.ControlLabel>
            <BS.FormControl type="text"/>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
);

export default Printer;
