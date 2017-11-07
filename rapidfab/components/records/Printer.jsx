import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Nav, NavItem } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

import PrinterFormContainer from 'rapidfab/containers/records/PrinterFormContainer';

const Printer = ({ handleSelectTab, route, tab }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['printers', route.uuid || 'New']} />

    {route.uuid && (
      <Nav bsStyle="tabs" activeKey={tab} onSelect={handleSelectTab}>
        <NavItem eventKey={1}>Summary</NavItem>
        <NavItem eventKey={2}>Block Machine</NavItem>
      </Nav>
    )}

    <FlashMessages />

    {tab === 1 && <PrinterFormContainer route={route} />}
    {tab === 2 && <p>block machine</p>}
  </Grid>
);

Printer.propTypes = {
  handleSelectTab: PropTypes.func.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
  tab: PropTypes.number.isRequired,
};

export default Printer;
