import React, { Component }     from "react";
import * as BS                  from 'react-bootstrap';

export default class Locations extends Component {
  render() {
    return (
      <BS.Grid>
        <BS.Row>
          <BS.Breadcrumb className='breadcrumbs'>
            <BS.Breadcrumb.Item href="/">
              Home
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="/#/locations">
              Locations
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Row>
        <BS.Row>
          <BS.Col xs={6}>
            <BS.Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Location</td>
                  <td>Name, Last Name</td>
                  <td>Location</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>Name, Last Name</td>
                  <td>Location</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>Name, Last Name</td>
                  <td>Location</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>Name, Last Name</td>
                  <td>Location</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>Name, Last Name</td>
                  <td>Location</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>Name, Last Name</td>
                  <td>Location</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>Name, Last Name</td>
                  <td>Location</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>Name, Last Name</td>
                  <td>Location</td>
                </tr>
              </tbody>
            </BS.Table>
          </BS.Col>
          <BS.Col xs={6} xsOffset={0}>
            <BS.Row>
              <BS.Col xs={6} xsOffset={6}>
                <BS.Button bsStyle="primary" bsSize="small" block>Add Location</BS.Button>
              </BS.Col>
            </BS.Row>
            <BS.Form>
              <BS.FormGroup controlId="formInlineName">
                <BS.ControlLabel>Name</BS.ControlLabel>
                <BS.FormControl type="text"/>
              </BS.FormGroup>
              <BS.FormGroup controlId="formInlineName">
                <BS.ControlLabel>Contact</BS.ControlLabel>
                <BS.FormControl type="text"/>
              </BS.FormGroup>
              <BS.FormGroup controlId="formInlineName">
                <BS.ControlLabel>Phone</BS.ControlLabel>
                <BS.FormControl type="text"/>
              </BS.FormGroup>
              <BS.FormGroup controlId="formInlineName">
                <BS.ControlLabel>Address</BS.ControlLabel>
                <BS.FormControl type="text"/>
              </BS.FormGroup>
            </BS.Form>
            <BS.Table striped bordered hover>
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
            <BS.Row>
              <BS.Col xs={6}>
                <BS.Button bsStyle="danger" bsSize="medium" block>Delete</BS.Button>
              </BS.Col>
              <BS.Col xs={6}>
                <BS.Button bsStyle="success" bsSize="medium" block>Save</BS.Button>
              </BS.Col>
            </BS.Row>
          </BS.Col>
        </BS.Row>
      </BS.Grid>
    );
  }
}
