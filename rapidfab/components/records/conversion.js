import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import { FormattedMessage }     from 'react-intl';
import Error                    from 'rapidfab/components/error'
import { Currencies }           from 'rapidfab/constants'


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const ConversionForm = ({ fields, bureaus, handleSubmit, load, submitting, onDelete, apiErrors }) => (
  <form onSubmit={handleSubmit}>
    <BS.Grid fluid>
      <BS.Row>
        <BS.Col xs={12}>
          <BS.Breadcrumb>
          <BS.Breadcrumb.Item active={true}>
              <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="#/inventory/conversions">
              <Fa name='exchange'/> <FormattedMessage id="inventory.currencies" defaultMessage='Currencies'/>
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item>
              <Fa name='exchange'/> {fields.id.value || <FormattedMessage id="record.currency.new" defaultMessage='New Currency'/>}
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Col>
      </BS.Row>

      <BS.Row>
        <BS.Col xs={6}>
          <BS.Button href="#/inventory/conversions" bsSize="small">
            <Fa name='arrow-left'/> <FormattedMessage id="inventory.currencies" defaultMessage='Currencies'/>
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
          <BS.FormGroup controlId="uxMultiplier">
            <BS.ControlLabel>Multiplier:</BS.ControlLabel>
            <BS.FormControl name="value" type="number" step="0.01" required {...fields.value}/>
          </BS.FormGroup>

          <BS.FormGroup controlId="uxCurrency">
            <BS.ControlLabel>Currency:</BS.ControlLabel>
            <BS.FormControl componentClass="select" {...fields.currency}>
              <option key="placeholder" value="" selected disabled>Select a currency</option>
              {_.map(Currencies, currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </BS.FormControl>
          </BS.FormGroup>

          <BS.FormGroup style={{ display: "none" }} controlId="uxBureau">
            <BS.ControlLabel><FormattedMessage id="field.bureau" defaultMessage='Bureau'/>:</BS.ControlLabel>
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
)

export default ConversionForm
