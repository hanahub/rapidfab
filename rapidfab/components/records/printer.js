import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';
import Error                    from 'rapidfab/components/error'


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const PrinterForm = ({ fields, handleSubmit, load, submitting, onDelete, printerTypes, locations, apiErrors}) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
            <BS.Breadcrumb.Item>
              <Fa name='book'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/printers">
              <Fa name='print'/> <FormattedMessage id="inventory.printers" defaultMessage='Printers'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='print'/> {fields.id.value || <FormattedMessage id="record.printer.new" defaultMessage='New Printer'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/printers" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.printers" defaultMessage='Printers'/>
          </BS.Button>
        </BS.Col>
        <BS.Col xs={6}>
          <BS.ButtonToolbar className="pull-right">
            <BS.SplitButton id="uxSaveDropdown" type="submit" bsStyle="success" bsSize="small" title={<SaveButtonTitle />} pullRight>
              <BS.MenuItem eventKey={1} onClick={() => onDelete(fields.uuid.value)} disabled={!fields.id.value}>
                <Fa name='ban'/> <FormattedMessage id="button.delete" defaultMessage='Delete'/>
              </BS.MenuItem>
            </BS.SplitButton>
          </BS.ButtonToolbar>
        </BS.Col>
      </BS.Row>

      <hr/>

      <BS.Row>
        <BS.Col xs={12}>
          <Error errors={apiErrors}/>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={12}>
          <BS.FormGroup controlId="uxName">
            <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
            <BS.FormControl type="text" required {...fields.name}/>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxPrinterType">
            <BS.ControlLabel><FormattedMessage id="field.printerType" defaultMessage='Printer Type'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.printer_type}>
              <option key="placeholder" value="" selected disabled>Select a Printer Type</option>
              {_.map(printerTypes, printerType => (
                <option key={printerType.uri} value={printerType.uri}>{`${printerType.id} - ${printerType.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
          <BS.FormGroup controlId="uxLocation">
            <BS.ControlLabel><FormattedMessage id="field.location" defaultMessage='Location'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required {...fields.location}>
              <option key="placeholder" value="" selected disabled>Select a Location</option>
              {_.map(locations, location => (
                <option key={location.uri} value={location.uri}>{`${location.id} - ${location.name}`}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>
        </BS.Col>
      </BS.Row>
    </BS.Grid>
  </form>
)

export default PrinterForm
