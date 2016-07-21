import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import { FormattedMessage }     from 'react-intl';

const ManufacturersForm = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxName">
        <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
        <BS.FormControl name="name" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxEmail">
        <BS.ControlLabel><FormattedMessage id="field.email" defaultMessage='Email'/>:</BS.ControlLabel>
        <BS.FormControl name="email" componentClass="email"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxLocation">
        <BS.ControlLabel><FormattedMessage id="field.location" defaultMessage='Location'/>:</BS.ControlLabel>
        <BS.FormControl name="location" componentClass="text"/>
      </BS.FormGroup>
      <BS.Checkbox name="locationAccess">
        <FormattedMessage id="field.accessToAllLocations" defaultMessage='Access to All Locations'/>:
      </BS.Checkbox>
    </BS.Col>
  </BS.Row>
)

export default ManufacturersForm
