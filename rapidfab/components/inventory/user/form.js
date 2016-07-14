import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';

const ManufacturersForm = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxName">
        <BS.ControlLabel>Name:</BS.ControlLabel>
        <BS.FormControl name="name" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxEmail">
        <BS.ControlLabel>Email:</BS.ControlLabel>
        <BS.FormControl name="email" componentClass="email"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxLocation">
        <BS.ControlLabel>Location:</BS.ControlLabel>
        <BS.FormControl name="location" componentClass="text"/>
      </BS.FormGroup>
      <BS.Checkbox name="locationAccess">
        Access to all locations
      </BS.Checkbox>
    </BS.Col>
  </BS.Row>
)

export default ManufacturersForm
