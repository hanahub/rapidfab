import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';

const OrderReport = ({ reportUrl }) => (
  <Button bsStyle="primary" bsSize="small" href={reportUrl}>
    <FormattedMessage
      id="downloadOrderReport"
      defaultMessage="Download Order Report"
    />
  </Button>
);

OrderReport.propTypes = {
  reportUrl: PropTypes.string.isRequired,
};

export default OrderReport;
