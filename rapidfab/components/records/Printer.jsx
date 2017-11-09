import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Nav, NavItem } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

import BlockMachinesContainer from 'rapidfab/containers/inventory/BlockMachinesContainer';
import PrinterFormContainer from 'rapidfab/containers/records/PrinterFormContainer';

const Printer = ({ handleSelectTab, route, tab, uri }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['printers', route.uuid || 'New']} />

    {route.uuid && (
      <Nav bsStyle="tabs" activeKey={tab} onSelect={handleSelectTab}>
        <NavItem eventKey={1}>Summary</NavItem>
        <NavItem disabled={!uri} eventKey={2}>
          Block Machine
        </NavItem>
      </Nav>
    )}

    <FlashMessages />

    {tab === 1 && <PrinterFormContainer route={route} />}
    {tab === 2 && <BlockMachinesContainer machineType="printer" uri={uri} />}
  </Grid>
);

Printer.defaultProps = {
  uri: null,
};

Printer.propTypes = {
  handleSelectTab: PropTypes.func.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
  tab: PropTypes.number.isRequired,
  uri: PropTypes.string,
};

export default Printer;
