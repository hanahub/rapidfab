import React, { Component }     from "react";
import * as BS                  from 'react-bootstrap';
import Faker                    from 'faker';
import Fa                       from 'react-fontawesome';

class NavBar extends Component {
  render() {
    return (
      <BS.Navbar fixedTop inverse>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="#/">Rapid Fab</a>
          </BS.Navbar.Brand>
        </BS.Navbar.Header>
        <BS.Nav>
          <BS.NavDropdown eventKey={1} title="Plan" id="uxNavPlan">
            <BS.MenuItem eventKey={1.1} href="#/plan/order">
              <Fa name='files-o'/> Orders
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={1.2} href="#/plan/print-queue">
              <Fa name='list'/> Print Queue
            </BS.MenuItem>
            <BS.MenuItem eventKey={1.3} href="#/plan/post-processing">
              <Fa name='flask'/> Post Processing
            </BS.MenuItem>
          </BS.NavDropdown>
          <BS.NavDropdown eventKey={2} title="Work" id="uxNavWork">
            <BS.MenuItem eventKey={2.1} href="#/work/queue">
              <Fa name='list'/> Queues
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={2.2} href="#/work/shipping">
              <Fa name='truck'/> Shipping
            </BS.MenuItem>
            <BS.MenuItem eventKey={2.3} href="#/work/third-party">
              <Fa name='sign-language'/> Third Party
            </BS.MenuItem>
          </BS.NavDropdown>
          <BS.NavDropdown eventKey={3} title="Inventory" id="uxNavInventory">
            <BS.MenuItem eventKey={3.1} href="#/inventory/material">
              <Fa name='object-ungroup' /> Material
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={3.2} href="#/inventory/resource">
              <Fa name='tags' /> Material Resources
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/post-processing">
              <Fa name='server'/> Printer &amp; Post processing
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/manufacturer">
              <Fa name='industry'/> Manufacturers
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/third-party-provider">
              <Fa name='building'/> Third Party Providers
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={3.3} href="#/inventory/location">
              <Fa name='map-marker'/> Manage Locations
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/user">
              <Fa name='users'/> Manage Users
            </BS.MenuItem>
          </BS.NavDropdown>
        </BS.Nav>
        <BS.Nav pullRight>
          <BS.NavDropdown eventKey={1} title={Faker.name.findName()} id="uxNavProfile">
            <BS.MenuItem eventKey={1.1} href="#/profile">
              <Fa name='user'/> My Profile
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={1.2} href="#/logout">
              <Fa name='sign-out'/> Logout
            </BS.MenuItem>
          </BS.NavDropdown>
        </BS.Nav>
      </BS.Navbar>
    );
  }
}

export default NavBar
