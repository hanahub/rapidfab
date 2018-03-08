import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'rapidfab/i18n';

const OrderReport = () => (
  <Button bsStyle="primary" bsSize="small" onClick={() => {}}>
    <FormattedMessage
      id="downloadOrderReport"
      defaultMessage="Download Order Report"
    />
  </Button>
);

export default OrderReport;
