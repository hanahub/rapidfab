import React, { Component }     from "react";
import * as BS                  from 'react-bootstrap';

export default class Manufacturers extends Component {
  render() {
    return (
      <BS.Grid>
        <BS.Row>
          <BS.Breadcrumb className='breadcrumbs'>
            <BS.Breadcrumb.Item href="/">
              Home
            </BS.Breadcrumb.Item>
            <BS.Breadcrumb.Item href="/#/manufacturers">
              Manufacturers
            </BS.Breadcrumb.Item>
          </BS.Breadcrumb>
        </BS.Row>
        <BS.Row>
          <BS.Col xs={6} className="separator">
            <BS.Table striped bordered hover>
              <thead>
                <tr>
                  <th>Manufacturer</th>
                  <th>Count</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Manufacturer</td>
                  <td>02</td>
                  <td>CA</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>02</td>
                  <td>CA</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>02</td>
                  <td>CA</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>02</td>
                  <td>CA</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>02</td>
                  <td>CA</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>02</td>
                  <td>CA</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>02</td>
                  <td>CA</td>
                </tr>
              </tbody>
            </BS.Table>
          </BS.Col>
          <BS.Col xs={6} xsOffset={0}>
            <BS.Row>
              <BS.Col xs={6} xsOffset={6}>
                <BS.Button bsStyle="primary" bsSize="small" block>Add new manufacturer</BS.Button>
              </BS.Col>
            </BS.Row>
            <BS.Input
              label='Name:'
              type='text'
              ref='name'
            />
            <BS.Input
              label='Commercial Contact:'
              type='text'
              ref='name'
            />
            <BS.Input
              label='Commercial Phone:'
              type='text'
              ref='name'
            />
            <BS.Input
              label='Support Contact:'
              type='text'
              ref='name'
            />
            <BS.Input
              label='Support Phone:'
              type='text'
              ref='name'
            />
            <BS.Input
              label='Address:'
              type='text'
              ref='name'
            />
            <BS.Input
              label='Notes:'
              type='textarea'
              ref='name'
            />
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

