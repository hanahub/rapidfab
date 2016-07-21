import React, { PropTypes }     from "react";
import * as BS                  from 'react-bootstrap';

const Form = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <BS.FormGroup controlId="uxName">
        <BS.ControlLabel>Name:</BS.ControlLabel>
        <BS.FormControl name="name" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxContact">
        <BS.ControlLabel>Contact:</BS.ControlLabel>
        <BS.FormControl name="contact" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxPhone">
        <BS.ControlLabel>Phone:</BS.ControlLabel>
        <BS.FormControl name="phone" componentClass="text"/>
      </BS.FormGroup>
      <BS.FormGroup controlId="uxAddress">
        <BS.ControlLabel>Address:</BS.ControlLabel>
        <BS.FormControl name="address" componentClass="text"/>
      </BS.FormGroup>
      <BS.Table bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Material</th>
            <th>Type</th>
            <th>Manufacturer</th>
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
