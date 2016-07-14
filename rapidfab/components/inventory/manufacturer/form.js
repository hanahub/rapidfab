import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';

const ManufacturersForm = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxName">
        <BS.ControlLabel>Name:</BS.ControlLabel>
        <BS.FormControl name="name" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxCommercialContact">
        <BS.ControlLabel>Commercial Contact:</BS.ControlLabel>
        <BS.FormControl name="commercialContact" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxCommercialPhone">
        <BS.ControlLabel>Commercial Phone:</BS.ControlLabel>
        <BS.FormControl name="commercialPhone" componentClass="tel"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxSupportContact">
        <BS.ControlLabel>Support Contact:</BS.ControlLabel>
        <BS.FormControl name="supportContact" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxSupportPhone">
        <BS.ControlLabel>Support Phone:</BS.ControlLabel>
        <BS.FormControl name="supportPhone" componentClass="tel"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxAddress">
        <BS.ControlLabel>Address:</BS.ControlLabel>
        <BS.FormControl name="address" componentClass="textarea"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxNotes">
        <BS.ControlLabel>Notes:</BS.ControlLabel>
        <BS.FormControl name="notes" componentClass="textarea"/>
      </BS.FormGroup>
    </BS.Col>
  </BS.Row>
)

export default ManufacturersForm
