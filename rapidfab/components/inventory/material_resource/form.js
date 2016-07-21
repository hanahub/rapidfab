import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import { FormattedMessage }     from 'react-intl';

const Form = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxMaterial">
        <BS.ControlLabel><FormattedMessage id="field.material" defaultMessage='Material'/>:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxLocation">
        <BS.ControlLabel><FormattedMessage id="field.location" defaultMessage='Location'/>:</BS.ControlLabel>
        <BS.FormControl componentClass="select" placeholder="select">
          <option value="select">ComboBox</option>
          <option value="other">...</option>
        </BS.FormControl>
      </BS.FormGroup>
    </BS.Col>
  </BS.Row>
)

export default Form
