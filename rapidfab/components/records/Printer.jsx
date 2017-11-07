import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'react-bootstrap';

import BreadcrumbNav from 'rapidfab/components/BreadcrumbNav';
import FlashMessages from 'rapidfab/components/FlashMessages';

import PrinterFormContainer from 'rapidfab/containers/records/PrinterFormContainer';

const Printer = ({ route }) => (
  <Grid fluid>
    <BreadcrumbNav breadcrumbs={['printers', route.uuid || 'New']} />
    <FlashMessages />
    <PrinterFormContainer route={route}/>
  </Grid>
);

Printer.propTypes = {
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
};

export default Printer;
