import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import { FormattedMessage } from 'rapidfab/i18n';

const CostTooltip = (
  <OverlayTrigger
    placement="top"
    overlay={
      <Tooltip>
        <FormattedMessage
          id="costTooltip"
          defaultMessage="Currency is chosen per order. Update your currency conversions in the Inventory."
        />
      </Tooltip>
    }
  >
    <Fa name="question-circle" />
  </OverlayTrigger>
);

export default CostTooltip;
