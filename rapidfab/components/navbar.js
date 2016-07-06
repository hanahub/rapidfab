import React                  from 'react';
import classnames             from 'classnames';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Input, Button } from 'react-bootstrap';

var MyNavbar = React.createClass({
  render: function() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#/">
              <p>Rapid Fab</p>
            </a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
});

module.exports = {
  Navbar              : MyNavbar,
}
