import React from 'react';
import * as BS from 'react-bootstrap';

const Manufacturers = () =>
  <BS.Grid>
    <BS.Row>
      <BS.Col xs={12}>
        <BS.Breadcrumb className="breadcrumbs">
          <BS.Breadcrumb.Item href="/">Home</BS.Breadcrumb.Item>
          <BS.Breadcrumb.Item href="/#/materials">Materials</BS.Breadcrumb.Item>
        </BS.Breadcrumb>
      </BS.Col>
    </BS.Row>
    <BS.Row>
      <BS.Col xs={6}>
        <BS.Table striped bordered hover>
          <thead>
            <tr>
              <th>Material</th>
              <th>Type</th>
              <th>Manufacturer</th>
              <th>Package</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Support</td>
              <td>Manufacturer</td>
              <td>222 g</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Support</td>
              <td>Manufacturer</td>
              <td>222 g</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Support</td>
              <td>Manufacturer</td>
              <td>222 g</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Support</td>
              <td>Manufacturer</td>
              <td>222 g</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Support</td>
              <td>Manufacturer</td>
              <td>222 g</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Support</td>
              <td>Manufacturer</td>
              <td>222 g</td>
              <td>None</td>
            </tr>
          </tbody>
        </BS.Table>
        <BS.Row>
          <BS.Col xs={12}>
            <BS.Button bsStyle="primary" bsSize="small" block>
              Add new material
            </BS.Button>
          </BS.Col>
        </BS.Row>
      </BS.Col>
      <BS.Col xs={6}>
        <BS.Row>
          <BS.Col xs={12}>
            <BS.Image src="https://placehold.it/100x100" rounded />
          </BS.Col>
        </BS.Row>
        <BS.Row>
          <BS.Col xs={12}>
            <BS.Form>
              <BS.FormGroup>
                <BS.ControlLabel>Material:</BS.ControlLabel>
                <BS.FormControl.Static>Name</BS.FormControl.Static>
              </BS.FormGroup>
              <BS.FormGroup>
                <BS.ControlLabel>Type:</BS.ControlLabel>
                <BS.FormControl.Static>Support</BS.FormControl.Static>
              </BS.FormGroup>
              <BS.FormGroup>
                <BS.ControlLabel>Color:</BS.ControlLabel>
                <BS.FormControl.Static>None</BS.FormControl.Static>
              </BS.FormGroup>
              <BS.FormGroup>
                <BS.ControlLabel>Manufacturer:</BS.ControlLabel>
                <BS.FormControl.Static>Manufccc</BS.FormControl.Static>
              </BS.FormGroup>
              <BS.FormGroup>
                <BS.ControlLabel>Package:</BS.ControlLabel>
                <BS.FormControl.Static>222 g</BS.FormControl.Static>
              </BS.FormGroup>
              <BS.FormGroup controlId="formControlsSelect">
                <BS.ControlLabel>Location:</BS.ControlLabel>
                <BS.FormControl componentClass="select" placeholder="select">
                  <option value="ComboBox">ComboBox</option>
                  <option value="other">...</option>
                </BS.FormControl>
              </BS.FormGroup>
            </BS.Form>
          </BS.Col>
        </BS.Row>
        <BS.Row>
          <BS.Col xs={6}>
            <BS.Button bsStyle="danger" bsSize="medium" block>
              Delete
            </BS.Button>
          </BS.Col>
          <BS.Col xs={6}>
            <BS.Button bsStyle="success" bsSize="medium" block>
              Save
            </BS.Button>
          </BS.Col>
        </BS.Row>
      </BS.Col>
    </BS.Row>
  </BS.Grid>;

export default Manufacturers;
