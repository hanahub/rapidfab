import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import { FormattedMessage }     from 'react-intl';

const Form = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxDescription">
        <BS.ControlLabel><FormattedMessage id="field.description" defaultMessage='Description'/>:</BS.ControlLabel>
        <BS.FormControl name="description" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxMaterialType">
        <BS.ControlLabel><FormattedMessage id="field.materialType" defaultMessage='materialType'/>:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxManufacturer">
        <BS.ControlLabel><FormattedMessage id="field.manufacturer" defaultMessage='Manufacturer'/>:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxRetailPrice">
        <BS.ControlLabel><FormattedMessage id="field.retailPrice" defaultMessage='Retail Price'/>:</BS.ControlLabel>
        <BS.FormControl name="retail-price" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxColor">
        <BS.ControlLabel><FormattedMessage id="field.color" defaultMessage='Color'/>:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
      <BS.Checkbox checked readOnly>
        <FormattedMessage id="field.fullfilledByThirdParty" defaultMessage='Fullfilled by Third Party'/>
      </BS.Checkbox>
      <BS.FormGroup>
        <BS.InputGroup>
          <BS.ControlLabel><FormattedMessage id="field.packageSize" defaultMessage='Package Size'/>:</BS.ControlLabel>
          <BS.FormControl type="text" />
          <BS.DropdownButton
            componentClass={BS.InputGroup.Button}
            id="input-dropdown-addon"
            title="unit_id"
          >
            <BS.MenuItem key="1">Item</BS.MenuItem>
          </BS.DropdownButton>
        </BS.InputGroup>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxMinutesProcessing">
        <BS.ControlLabel><FormattedMessage id="field.minutesProcessing" defaultMessage='Minutes Processing'/>:</BS.ControlLabel>
        <BS.FormControl name="minutes-processing" componentClass="text"/>
      </BS.FormGroup>
    </BS.Col>
  </BS.Row>
)

export default Form
