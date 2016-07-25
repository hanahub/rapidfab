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
      <BS.FormGroup controlId="uxCommercialContact">
        <BS.ControlLabel><FormattedMessage id="field.commercialContact" defaultMessage='Commercial Contact'/>:</BS.ControlLabel>
        <BS.FormControl name="commercialContact" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxCommercialPhone">
        <BS.ControlLabel><FormattedMessage id="field.commercialPhone" defaultMessage='Commercial Phone:'/>:</BS.ControlLabel>
        <BS.FormControl name="commercialPhone" componentClass="tel"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxSupportContact">
        <BS.ControlLabel><FormattedMessage id="field.supportContact" defaultMessage='Support Contact'/>:</BS.ControlLabel>
        <BS.FormControl name="supportContact" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxSupportPhone">
        <BS.ControlLabel><FormattedMessage id="field.supportPhone" defaultMessage='Support Phone'/>:</BS.ControlLabel>
        <BS.FormControl name="supportPhone" componentClass="tel"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxAddress">
        <BS.ControlLabel><FormattedMessage id="field.address" defaultMessage='Address'/>:</BS.ControlLabel>
        <BS.FormControl name="address" componentClass="textarea"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxNotes">
        <BS.ControlLabel><FormattedMessage id="field.notes" defaultMessage='Notes'/>:</BS.ControlLabel>
        <BS.FormControl name="notes" componentClass="textarea"/>
      </BS.FormGroup>
    </BS.Col>
  </BS.Row>
)

export default ManufacturersForm
