import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Nav, NavItem, PageHeader } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

import DowntimeContainer from 'rapidfab/containers/downtime/DowntimeContainer';
import PrinterFormContainer from 'rapidfab/containers/records/PrinterFormContainer';

const Printer = ({ handleSelectTab, name, route, tab, uri }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['printers', route.uuid || 'New']} />

    <PageHeader>{name || 'New Printer'}</PageHeader>

    {route.uuid && (
      <Nav bsStyle="tabs" activeKey={tab} onSelect={handleSelectTab}>
        <NavItem eventKey={1}>Summary</NavItem>
        <NavItem disabled={!uri} eventKey={2}>
          Printer Downtime
        </NavItem>
      </Nav>
    )}

    <FlashMessages />

    {tab === 1 && <PrinterFormContainer route={route} />}
    {tab === 2 && <DowntimeContainer machineType="printer" machineUri={uri} />}
  </Grid>
);

Printer.defaultProps = {
  name: null,
  uri: null,
};

Printer.propTypes = {
  handleSelectTab: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
  tab: PropTypes.number.isRequired,
  uri: PropTypes.string,
};

export default Printer;
