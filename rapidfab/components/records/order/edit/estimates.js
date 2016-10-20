import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedCost,
  FormattedDate,
  FormattedDuration,
  FormattedMessage,
  FormattedVolume
} from 'rapidfab/i18n';


const OrderEstimates = ({ estimates }) => (
  <BS.Panel bsStyle="info">
    <BS.ListGroup fill>
      <BS.ListGroupItem header={<FormattedMessage id="field.estimatedPrintTime" defaultMessage='Estimated Print Time'/>}>
        {estimates.print_time.value ?
          <FormattedDuration value={estimates.print_time.value}/> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.ListGroupItem>
      <BS.ListGroupItem header={<FormattedMessage id="field.estimatedShippingDate" defaultMessage='Estimated Shipping Date'/>}>
        {estimates.shipping_date.value ?
          <FormattedDate value={estimates.shipping_date.value}/> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.ListGroupItem>
      <BS.ListGroupItem header={<FormattedMessage id="field.estimatedMaterialUsed" defaultMessage='Estimated Material Used'/>}>
        {estimates.materials.base.value ?
          <FormattedVolume value={estimates.materials.base.value}/> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.ListGroupItem>
      <BS.ListGroupItem header={<FormattedMessage id="field.estimatedSupportUsed" defaultMessage='Estimated Support Used'/>}>
        {estimates.materials.support.value ?
          <FormattedVolume value={estimates.materials.support.value}/> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.ListGroupItem>
      <BS.ListGroupItem header={<FormattedMessage id="field.estimatedCost" defaultMessage='Estimated Cost'/>}>
        {estimates.cost.amount.value ?
          <FormattedCost currency={estimates.cost.currency.value} value={estimates.cost.amount.value} /> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.ListGroupItem>
    </BS.ListGroup>
  </BS.Panel>
)

export default OrderEstimates