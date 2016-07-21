import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';

const Form = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup>
        <BS.ControlLabel>Resource:</BS.ControlLabel>
        <BS.FormControl.Static>
          Name
        </BS.FormControl.Static>
      </BS.FormGroup>
      <BS.FormGroup>
        <BS.ControlLabel>Printer</BS.ControlLabel>
      </BS.FormGroup>
      <BS.FormGroup>
        <BS.ControlLabel>Manufacturer:</BS.ControlLabel>
        <BS.FormControl.Static>
          Manufccc
        </BS.FormControl.Static>
      </BS.FormGroup>
      <BS.FormGroup>
        <BS.ControlLabel>Print Bed::</BS.ControlLabel>
        <BS.FormControl.Static>
          X: 222 Y: XXX Z: XXX
        </BS.FormControl.Static>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxLocation">
        <BS.ControlLabel>Location:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
    </BS.Col>
  </BS.Row>
)

export default Form
