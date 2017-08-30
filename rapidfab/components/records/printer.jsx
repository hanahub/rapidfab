import React from 'react';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import Error from 'rapidfab/components/error';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import SaveButtonTitle from 'rapidfab/components/SaveButtonTitle';

const PrinterForm = ({
  fields,
  handleSubmit,
  onDelete,
  printerTypes,
  locations,
  apiErrors,
}) =>
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BreadcrumbNav breadcrumbs={['printers', fields.id.value || 'New']} />
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
              {...fields.printer_type}
            >
              <option key="placeholder" value="" selected disabled>
                Select a Printer Type
              </option>
              {_.map(printerTypes, printerType =>
                <option
                  key={printerType.uri}
                  value={printerType.uri}
                >{`${printerType.id} - ${printerType.name}`}</option>
              )}
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
              {...fields.location}
            >
              <option key="placeholder" value="" selected disabled>
                Select a Location
              </option>
              {_.map(locations, location =>
                <option
                  key={location.uri}
                  value={location.uri}
                >{`${location.id} - ${location.name}`}</option>
              )}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxModeler">
            <BS.ControlLabel>
              <FormattedMessage id="field.modeler" defaultMessage="Modeler" />:
            </BS.ControlLabel>
            <BS.FormControl type="text" {...fields.modeler} />
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>;

export default PrinterForm;
