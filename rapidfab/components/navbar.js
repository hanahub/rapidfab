import React, { Component }     from "react";
import * as BS                  from 'react-bootstrap';

export default class NavBar extends Component {
  render() {
    return (
      <BS.Navbar fixedTop>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="#/">
              <p>Rapid Fab</p>
            </a>
          </BS.Navbar.Brand>
        </BS.Navbar.Header>
      </BS.Navbar>
    );
  }
}
