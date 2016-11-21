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


const OrderEstimates = ({ estimates, currency }) => (
  <BS.Panel bsStyle="info">
    <BS.ListGroup fill>
      <BS.ListGroupItem header={<FormattedMessage id="field.estimatedPrintTime" defaultMessage='Estimated Print Time'/>}>
        {estimates.print_time.value ?
          <FormattedDuration value={estimates.print_time.value}/> :
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
          <FormattedCost currency={currency.value} value={estimates.cost.amount.value} /> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.ListGroupItem>
      <BS.ListGroupItem header={<FormattedMessage id="field.estimatedShippingCost" defaultMessage='Estimated Shipping Cost'/>}>
        {estimates.cost.shipping_amount.value ?
          <FormattedCost currency={currency.value} value={estimates.cost.shipping_amount.value} /> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.ListGroupItem>
      <BS.ListGroupItem header={<FormattedMessage id="field.estimatedTotalCost" defaultMessage='Estimated Total Cost'/>}>
        {estimates.cost.amount.value + estimates.cost.shipping_amount.value ?
          <FormattedCost currency={currency.value} value={estimates.cost.amount.value + estimates.cost.shipping_amount.value} /> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.ListGroupItem>
    </BS.ListGroup>
  </BS.Panel>
)

export default OrderEstimates
