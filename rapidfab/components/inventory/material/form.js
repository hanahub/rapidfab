import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';

const Form = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxDescription">
        <BS.ControlLabel>Description:</BS.ControlLabel>
        <BS.FormControl name="description" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxMaterialType">
        <BS.ControlLabel>Material Type:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxManufacturer">
        <BS.ControlLabel>Manufacturer:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxRetailPrice">
        <BS.ControlLabel>Retail Price:</BS.ControlLabel>
        <BS.FormControl name="retail-price" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxColor">
        <BS.ControlLabel>Color:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
      <BS.Checkbox checked readOnly>
        Fulfilled by 3rd party
      </BS.Checkbox>
      <BS.FormGroup>
        <BS.InputGroup>
          <BS.ControlLabel>Package Size:</BS.ControlLabel>
          <BS.FormControl type="text" />
          <BS.DropdownButton
            id="input-dropdown-addon"
            title="unit_id"
          >
            <BS.MenuItem key="1">Item</BS.MenuItem>
          </BS.DropdownButton>
        </BS.InputGroup>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxMinutesProcessing">
        <BS.ControlLabel>MinutesProcessing:</BS.ControlLabel>
        <BS.FormControl name="minutes-processing" componentClass="text"/>
      </BS.FormGroup>
    </BS.Col>
  </BS.Row>
)

export default Form
