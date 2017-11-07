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

      <form onSubmit={handleSubmit}>

        <BS.FormGroup controlId="uxName">
          <BS.ControlLabel>
            <FormattedMessage id="field.name" defaultMessage="Name" />
          </BS.ControlLabel>
          <BS.FormControl
            name="name"
            onChange={handleInputChange}
            required
            type="text"
            value={name}
          />
        </BS.FormGroup>

        <BS.FormGroup controlId="uxPrinterType">
          <BS.ControlLabel>
            <FormattedMessage
              id="field.printerType"
              defaultMessage="Printer Type"
            />
          </BS.ControlLabel>
          <BS.FormControl
            name="printerType"
            onChange={handleInputChange}
            componentClass="select"
            required
            value={printerType}
          >
            {printerTypes.map(printerType => (
              <option
                key={printerType.uri}
                value={printerType.uri}
              >{`${printerType.name} - ${printerType.id}`}</option>
            ))}
          </BS.FormControl>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxLocation">
          <BS.ControlLabel>
            <FormattedMessage
              id="field.location"
              defaultMessage="Location"
            />
          </BS.ControlLabel>
          <BS.FormControl
            name="location"
            componentClass="select"
            onChange={handleInputChange}
            required
            value={location}
          >
            {locations.map(location => (
              <option
                key={location.uri}
                value={location.uri}
              >{`${location.name} - ${location.id}`}</option>
            ))}
          </BS.FormControl>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxModeler">
          <BS.ControlLabel>
            <FormattedMessage id="field.modeler" defaultMessage="Modeler" />
          </BS.ControlLabel>
          <BS.FormControl
            name="modeler"
            onChange={handleInputChange}
            required
            type="text"
            value={modeler}
          />
        </BS.FormGroup>

      </form>
    </BS.Grid>
);

export default Printer;
