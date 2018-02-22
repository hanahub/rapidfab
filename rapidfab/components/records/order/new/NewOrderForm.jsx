import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

import { Currencies } from 'rapidfab/constants';
import { FormattedMessage } from 'rapidfab/i18n';
import {
  FormControlTextArea,
  FormControlTextCareful,
} from 'rapidfab/components/formTools';
import {
  ORDER_BUSINESS_SEGMENT_MAPPING,
  ORDER_REGION_MAPPING,
  ORDER_SALES_MAPPING,
  ORDER_TYPE_EOS_MAPPING,
  ORDER_TYPE_FR_MAPPING,
  IP_SENSITIVITY_MAPPING,
} from 'rapidfab/mappings';

import Feature from 'rapidfab/components/Feature';

const FormRow = ({ id, defaultMessage, children }) => (
  <FormGroup>
    <Col xs={3}>
      <ControlLabel>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />:
      </ControlLabel>
    </Col>
    <Col xs={9}>{children}</Col>
  </FormGroup>
);

FormRow.propTypes = {
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const NewOrderForm = ({ fields, isUserRestricted, shippings, users }) => (
  <div>
    <FormRow id="orderName" defaultMessage="Order Name">
      <FormControl type="text" required {...fields.name} />
    </FormRow>

    {!isUserRestricted && (
      <Feature featureName="order-order-owner">
        <FormRow id="field.order_owner" defaultMessage="Owner">
          <FormControl componentClass="select" {...fields.order_owner}>
            <option value="none">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {users.map(user => (
              <option key={user.uuid} value={user.uri}>
                {user.name}
              </option>
            ))}
          </FormControl>
        </FormRow>
      </Feature>
    )}

    {!isUserRestricted && (
      <FormRow id="field.shippingName" defaultMessage="Shipping Name">
        <FormControlTextCareful {...fields.shipping.name} />
      </FormRow>
    )}

    <FormRow id="field.shippingAddress" defaultMessage="Shipping Address">
      <FormControlTextArea {...fields.shipping.address} />
    </FormRow>

    {!isUserRestricted && (
      <FormRow id="field.trackingNumber" defaultMessage="Tracking Number">
        <FormControlTextCareful {...fields.shipping.tracking} />
      </FormRow>
    )}

    {!isUserRestricted && (
      <FormRow id="field.shippingType" defaultMessage="Shipping Type">
        <FormControl componentClass="select" {...fields.shipping.uri}>
          {shippings.map(shipping => (
            <option key={shipping.uri} value={shipping.uri}>
              {shipping.name}
            </option>
          ))}
        </FormControl>
      </FormRow>
    )}

    {!isUserRestricted && (
      <FormRow id="field.currency" defaultMessage="Currency">
        <FormControl componentClass="select" {...fields.currency}>
          {Currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </FormControl>
      </FormRow>
    )}

    <Feature featureName="order-customer-po">
      <FormRow id="field.customer_po" defaultMessage="Customer PO">
        <FormControlTextCareful {...fields.customer_po} />
      </FormRow>
    </Feature>

    <Feature featureName="order-quote-number">
      <FormRow id="field.order_quote_number" defaultMessage="Quote Number">
        <FormControlTextCareful {...fields.quote_number} />
      </FormRow>
    </Feature>

    <FormRow id="field.customer_email" defaultMessage="Customer Email">
      <FormControlTextCareful {...fields.customer_email} />
    </FormRow>

    <FormRow id="field.customer_name" defaultMessage="Customer Name">
      <FormControlTextCareful {...fields.customer_name} />
    </FormRow>

    <Feature featureName="order-business-segment">
      <FormRow id="businessSegment" defaultMessage="Business Segment">
        <FormControl componentClass="select" {...fields.business_segment}>
          {Object.keys(ORDER_BUSINESS_SEGMENT_MAPPING).map(type => (
            <option key={type} value={type}>
              {ORDER_BUSINESS_SEGMENT_MAPPING[type]}
            </option>
          ))}
        </FormControl>
      </FormRow>
    </Feature>

    <Feature featureName="ip-sensitivity">
      <FormRow id="field.ipSensitivity" defaultMessage="IP Sensitivity">
        <FormControl componentClass="select" {...fields.ip_sensitivity}>
          {Object.keys(IP_SENSITIVITY_MAPPING).map(ip => (
            <option key={ip} value={ip}>
              {IP_SENSITIVITY_MAPPING[ip]}
            </option>
          ))}
        </FormControl>
      </FormRow>
    </Feature>

    <Feature featureName="fastradius-order-fields">
      <FormRow id="field.orderType" defaultMessage="Order Type">
        <FormControl componentClass="select" {...fields.order_type}>
          {Object.keys(ORDER_TYPE_FR_MAPPING).map(type => (
            <option key={type} value={type}>
              {ORDER_TYPE_FR_MAPPING[type]}
            </option>
          ))}
        </FormControl>
      </FormRow>
    </Feature>

    <Feature featureName="eos-order-fields">
      <div>
        <FormRow id="field.orderType" defaultMessage="Order Type">
          <FormControl componentClass="select" {...fields.order_type}>
            <option value="none">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {Object.keys(ORDER_TYPE_EOS_MAPPING).map(type => (
              <option key={type} value={type}>
                {ORDER_TYPE_EOS_MAPPING[type]}
              </option>
            ))}
          </FormControl>
        </FormRow>

        <FormRow id="field.sales_status" defaultMessage="Sales Status">
          <FormControl componentClass="select" {...fields.sales_status}>
            {Object.keys(ORDER_SALES_MAPPING).map(type => (
              <option key={type} value={type}>
                {ORDER_SALES_MAPPING[type]}
              </option>
            ))}
          </FormControl>
        </FormRow>

        <FormRow
          id="field.sales_representative"
          defaultMessage="Sales Representative"
        >
          <FormControl componentClass="select" {...fields.sales_representative}>
            <option value="none">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {users.map(user => (
              <option key={user.uuid} value={user.uri}>
                {user.name}
              </option>
            ))}
          </FormControl>
        </FormRow>

        <FormRow
          id="field.channel_representative"
          defaultMessage="Channel Representative"
        >
          <FormControl
            componentClass="select"
            {...fields.channel_representative}
          >
            <option value="none">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {users.map(user => (
              <option key={user.uuid} value={user.uri}>
                {user.name}
              </option>
            ))}
          </FormControl>
        </FormRow>

        <FormRow id="field.region" defaultMessage="Region">
          <FormControl componentClass="select" {...fields.region}>
            <option value="none">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {Object.keys(ORDER_REGION_MAPPING).map(type => (
              <option key={type} value={type}>
                {ORDER_REGION_MAPPING[type]}
              </option>
            ))}
          </FormControl>
        </FormRow>
      </div>
    </Feature>

    <FormRow id="field.notes" defaultMessage="Notes">
      <FormControlTextArea {...fields.notes} />
    </FormRow>

    <FormRow id="field.due_date" defaultMessage="Due Date">
      <input
        pattern="^\d{4}-\d{2}-\d{2}$"
        placeholder="yyyy-mm-dd"
        type="date"
        {...fields.due_date}
        style={{ color: 'black' }}
      />
    </FormRow>
  </div>
);

NewOrderForm.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  isUserRestricted: PropTypes.bool.isRequired,
  shippings: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewOrderForm;
