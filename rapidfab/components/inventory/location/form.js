import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';
import { FormattedMessage }     from 'react-intl';


const Form = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxName">
        <BS.ControlLabel>
          <FormattedMessage id="field.name" defaultMessage='Name'/>:
        </BS.ControlLabel>
        <BS.FormControl name="name" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxContact">
        <BS.ControlLabel>
          <FormattedMessage id="field.contact" defaultMessage='Contact'/>:
        </BS.ControlLabel>
        <BS.FormControl name="contact" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxPhone">
        <BS.ControlLabel>
          <FormattedMessage id="field.phone" defaultMessage='Phone'/>:
        </BS.ControlLabel>
        <BS.FormControl name="phone" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxAddress">
        <BS.ControlLabel>
          <FormattedMessage id="field.address" defaultMessage='Address'/>:
        </BS.ControlLabel>
        <BS.FormControl name="address" componentClass="text"/>
      </BS.FormGroup>
      <BS.Table bordered hover>
        <thead>
          <tr>
            <th></th>
            <th><FormattedMessage id="field.material" defaultMessage='Material'/></th>
            <th><FormattedMessage id="field.type" defaultMessage='Type'/></th>
            <th><FormattedMessage id="field.manufacturer" defaultMessage='Manufacture'/></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>add new</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </BS.Table>
    </BS.Col>
  </BS.Row>
)

export default Form
