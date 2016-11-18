import React, { Component }     from "react";
import * as BS                  from 'react-bootstrap';
import Fa                       from 'react-fontawesome';
import Flag                     from 'rapidfab/components/flag';
import { FormattedMessage }     from 'react-intl';

const LanguageFlagMap = {
  "en-US": "us",
  "ja": "jp"
}

class Navbar extends Component {
  render() {
    const { locale, onChangeLocale, currentUser } = this.props;
    const flag = LanguageFlagMap[locale];
    const planTitle = (
      <span>
        <Fa name='road'/> <FormattedMessage id="plan" defaultMessage='Plan'/>
      </span>
    );
    const workTitle = (
      <span>
        <Fa name='wrench'/> <FormattedMessage id="work" defaultMessage='Work'/>
      </span>
    );
    const inventoryTitle = (
      <span>
        <Fa name='list'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
      </span>
    );
    const myProfileTitle = (
      <span>
        <Fa name='user'/> {currentUser.name}
      </span>
    );

    return (
      <BS.Navbar fixedTop inverse fluid>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="#/"><FormattedMessage id="rapidfab" defaultMessage='Rapid Fab'/></a>
          </BS.Navbar.Brand>
        </BS.Navbar.Header>
        <BS.Nav>
          <BS.NavDropdown eventKey={1} title={planTitle} id="uxNavPlan">
            <BS.MenuItem eventKey={1.1} href="#/plan/orders">
              <Fa name='files-o'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={1.2} href="#/plan/runs">
              <Fa name='list'/> <FormattedMessage id="plan.runs" defaultMessage='Runs'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={1.4} href="#/plan/post-processing" style={{ display: "none" }}>
              <Fa name='flask'/> <FormattedMessage id="plan.postProcessing" defaultMessage='Post Processing'/>
            </BS.MenuItem>
          </BS.NavDropdown>
          <BS.NavDropdown eventKey={2} title={workTitle} id="uxNavWork">
            <BS.MenuItem eventKey={2.1} href="#/work/queues">
              <Fa name='list'/> <FormattedMessage id="work.queues" defaultMessage='Queues'/>
            </BS.MenuItem>
            <BS.MenuItem divider style={{ display: "none" }} />
            <BS.MenuItem eventKey={2.2} href="#/work/shipping" style={{ display: "none" }}>
              <Fa name='truck'/> <FormattedMessage id="work.shipping" defaultMessage='Shipping'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={2.3} href="#/work/third-party" style={{ display: "none" }}>
              <Fa name='sign-language'/> <FormattedMessage id="work.thirdParty" defaultMessage='Third Party'/>
            </BS.MenuItem>
          </BS.NavDropdown>
          <BS.NavDropdown eventKey={3} title={inventoryTitle} id="uxNavInventory">
            <BS.MenuItem eventKey={3.1} href="#/inventory/materials">
              <Fa name='object-group' /> <FormattedMessage id="inventory.materials" defaultMessage='Materials'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.2} href="#/inventory/stocks">
              <Fa name='tags' /> <FormattedMessage id="inventory.stocks" defaultMessage='Stocks'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/printers">
              <Fa name='print'/> <FormattedMessage id="inventory.printers" defaultMessage='Printers'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.4} href="#/inventory/post-processors">
              <Fa name='object-ungroup'/> <FormattedMessage id="inventory.postProcessors" defaultMessage='Post processors'/>
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={3.5} href="#/inventory/printer-types">
              <Fa name='print'/> <FormattedMessage id="inventory.printerTypes" defaultMessage='Printer Types'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.6} href="#/inventory/post-processor-types">
              <Fa name='object-group'/> <FormattedMessage id="inventory.postProcessorTypes" defaultMessage='Post processor Types'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.7} href="#/inventory/third-party-provider" style={{ display: "none" }}>
              <Fa name='building'/> <FormattedMessage id="inventory.thirdPartyProviders" defaultMessage='Third Party Providers'/>
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={3.8} href="#/inventory/manufacturers">
              <Fa name='industry'/> <FormattedMessage id="inventory.manufacturers" defaultMessage='Manufacturers'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.9} href="#/inventory/locations">
              <Fa name='map-marker'/> <FormattedMessage id="inventory.locations" defaultMessage='Locations'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.10} href="#/inventory/third-party-providers">
              <Fa name='map-marker'/> <FormattedMessage id="inventory.thirdPartyProviders" defaultMessage='Third Party Providers'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.11} href="#/inventory/users">
              <Fa name='users'/> <FormattedMessage id="inventory.users" defaultMessage='Users'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.12} href="#/inventory/Shipping">
              <Fa name='truck'/> <FormattedMessage id="inventory.shippings" defaultMessage='Shipping'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.13} href="#/inventory/conversions">
              <Fa name='exchange'/> <FormattedMessage id="inventory.conversions" defaultMessage='Conversions'/>
            </BS.MenuItem>
          </BS.NavDropdown>
        </BS.Nav>
        <BS.Nav pullRight>
          <BS.NavDropdown eventKey={1} title={myProfileTitle} id="uxNavProfile">
            <BS.MenuItem eventKey={1.1} href="#/profile" disabled>
              <Fa name='user'/> <FormattedMessage id="myProfile" defaultMessage='My Profile'/>
            </BS.MenuItem>
            <BS.MenuItem divider style={{ display: "none" }}/>
            <BS.MenuItem eventKey={1.2} href="#/logout" style={{ display: "none" }}>
              <Fa name='sign-out'/> <FormattedMessage id="logout" defaultMessage='Logout'/>
            </BS.MenuItem>
          </BS.NavDropdown>
          <BS.NavDropdown eventKey={2} title={<Flag type={flag}/>} id="uxNavLocale">
            <BS.MenuItem eventKey={2.1} onClick={() => onChangeLocale(locale, "en-US")}>
              <Fa name='check' style={{visibility: flag === "us" ? null : "hidden"}}/> <Flag type='us'/> English
            </BS.MenuItem>
            <BS.MenuItem eventKey={2.2} onClick={() => onChangeLocale(locale, "ja")}>
              <Fa name='check' style={{visibility: flag === "jp" ? null : "hidden"}}/> <Flag type='jp'/> 日本語
            </BS.MenuItem>
          </BS.NavDropdown>
        </BS.Nav>
      </BS.Navbar>
    );
  }
}

export default Navbar
