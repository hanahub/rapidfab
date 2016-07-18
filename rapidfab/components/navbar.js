import React, { Component }     from "react";
import * as BS                  from 'react-bootstrap';
import Faker                    from 'faker';
import Fa                       from 'react-fontawesome';
import Flag                     from 'rapidfab/components/flag';
import { FormattedMessage }     from 'react-intl';

const LanguageFlagMap = {
  "en-US": "us",
  "ja": "jp"
}

class Navbar extends Component {
  render() {
    const { locale, onChangeLocale } = this.props;
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
        <Fa name='book'/> <FormattedMessage id="inventory" defaultMessage='Inventory'/>
      </span>
    );
    const myProfileTitle = (
      <span>
        <Fa name='user'/> {Faker.name.findName()}
      </span>
    );

    return (
      <BS.Navbar fixedTop inverse>
        <BS.Navbar.Header>
          <BS.Navbar.Brand>
            <a href="#/"><FormattedMessage id="rapidfab" defaultMessage='Rapid Fab'/></a>
          </BS.Navbar.Brand>
        </BS.Navbar.Header>
        <BS.Nav>
          <BS.NavDropdown eventKey={1} title={planTitle} id="uxNavPlan">
            <BS.MenuItem eventKey={1.1} href="#/plan/order">
              <Fa name='files-o'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={1.2} href="#/plan/print-queue">
              <Fa name='list'/> <FormattedMessage id="plan.printQueue" defaultMessage='Print Queue'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={1.3} href="#/plan/post-processing">
              <Fa name='flask'/> <FormattedMessage id="plan.postProcessing" defaultMessage='Post Processing'/>
            </BS.MenuItem>
          </BS.NavDropdown>
          <BS.NavDropdown eventKey={2} title={workTitle} id="uxNavWork">
            <BS.MenuItem eventKey={2.1} href="#/work/queue">
              <Fa name='list'/> <FormattedMessage id="work.queues" defaultMessage='Queues'/>
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={2.2} href="#/work/shipping">
              <Fa name='truck'/> <FormattedMessage id="work.shipping" defaultMessage='Shipping'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={2.3} href="#/work/third-party">
              <Fa name='sign-language'/> <FormattedMessage id="work.thirdParty" defaultMessage='Third Party'/>
            </BS.MenuItem>
          </BS.NavDropdown>
          <BS.NavDropdown eventKey={3} title={inventoryTitle} id="uxNavInventory">
            <BS.MenuItem eventKey={3.1} href="#/inventory/material">
              <Fa name='object-ungroup' /> <FormattedMessage id="inventory.material" defaultMessage='Material'/>
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={3.2} href="#/inventory/resource">
              <Fa name='tags' /> <FormattedMessage id="inventory.materialResources" defaultMessage='Material Resources'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/post-processing">
              <Fa name='server'/> <FormattedMessage id="inventory.postProcessing" defaultMessage='Printer &amp; Post processing'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/manufacturer">
              <Fa name='industry'/> <FormattedMessage id="inventory.manufacturers" defaultMessage='Manufacturers'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/third-party-provider">
              <Fa name='building'/> <FormattedMessage id="inventory.thirdPartyProviders" defaultMessage='Third Party Providers'/>
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={3.3} href="#/inventory/location">
              <Fa name='map-marker'/> <FormattedMessage id="inventory.manageLocations" defaultMessage='Manage Locations'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={3.3} href="#/inventory/user">
              <Fa name='users'/> <FormattedMessage id="inventory.manageUsers" defaultMessage='Manage Users'/>
            </BS.MenuItem>
          </BS.NavDropdown>
        </BS.Nav>
        <BS.Nav pullRight>
          <BS.NavDropdown eventKey={1} title={myProfileTitle} id="uxNavProfile">
            <BS.MenuItem eventKey={1.1} href="#/profile">
              <Fa name='user'/> <FormattedMessage id="myProfile" defaultMessage='My Profile'/>
            </BS.MenuItem>
            <BS.MenuItem divider />
            <BS.MenuItem eventKey={1.2} href="#/logout">
              <Fa name='sign-out'/> <FormattedMessage id="logout" defaultMessage='Logout'/>
            </BS.MenuItem>
          </BS.NavDropdown>
          <BS.NavDropdown eventKey={2} title={<Flag type={flag}/>} id="uxNavLocale">
            <BS.MenuItem eventKey={2.1} onClick={() => onChangeLocale(locale, "en-US")}>
              <Fa name='check' style={{visibility: flag === "us" ? null : "hidden"}}/> <Flag type='us'/> <FormattedMessage id="language.english" defaultMessage='English'/>
            </BS.MenuItem>
            <BS.MenuItem eventKey={2.2} onClick={() => onChangeLocale(locale, "ja")}>
              <Fa name='check' style={{visibility: flag === "jp" ? null : "hidden"}}/> <Flag type='jp'/> <FormattedMessage id="language.japanese" defaultMessage='Japanese'/>
            </BS.MenuItem>
          </BS.NavDropdown>
        </BS.Nav>
      </BS.Navbar>
    );
  }
}

export default Navbar
