import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment-timezone';

import { Currencies } from 'rapidfab/constants';
import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';
import {
  IP_SENSITIVITY_MAPPING,
  ORDER_REGION_MAPPING,
  ORDER_SALES_MAPPING,
  ORDER_STATUS_MAP,
  ORDER_TYPE_EOS_MAPPING,
  ORDER_TYPE_FR_MAPPING,
} from 'rapidfab/mappings';
import {
  FormControlTextArea,
  FormControlTextCareful,
} from 'rapidfab/components/formTools';

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

const EditOrderForm = ({ created, fields, shippings, users }) => (
  <div>
    <FormRow id="orderName" defaultMessage="Order Name">
      <FormControl type="text" required {...fields.name} />
    </FormRow>

    <FormRow id="field.status" defaultMessage="Status">
      <FormControl.Static>
        {ORDER_STATUS_MAP[fields.status.value]}
      </FormControl.Static>
    </FormRow>

    <FormRow id="field.shippingName" defaultMessage="Shipping Name">
      <FormControlTextCareful {...fields.shipping.name} />
    </FormRow>

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

    <FormRow id="field.shippingAddress" defaultMessage="Shipping Address">
      <FormControl componentClass="textarea" {...fields.shipping.address} />
    </FormRow>

    <FormRow id="field.trackingNumber" defaultMessage="Tracking Number">
      <FormControlTextCareful {...fields.shipping.tracking} />
    </FormRow>

    <FormRow id="field.shippingType" defaultMessage="Shipping Type">
      <FormControl componentClass="select" {...fields.shipping.uri}>
        {_.map(shippings, shipping => (
          <option key={shipping.uri} value={shipping.uri}>
            {shipping.name}
          </option>
        ))}
      </FormControl>
    </FormRow>

    <FormRow id="field.currency" defaultMessage="Currency">
      <FormControl componentClass="select" {...fields.currency}>
        {_.map(Currencies, currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </FormControl>
    </FormRow>

    <FormRow id="field.created" defaultMessage="Created">
      <FormControl.Static>
        {created ? (
          <span>
            <FormattedDateTime value={created} />
            <span>
              {' '}
              {moment()
                .tz(moment.tz.guess())
                .format('z')}{' '}
            </span>
          </span>
        ) : (
          <em>
            <FormattedMessage id="notAvailable" defaultMessage="N/A" />
          </em>
        )}
      </FormControl.Static>
    </FormRow>

    <Feature featureName="order_customer_po">
      <FormRow id="field.customer_po" defaultMessage="Customer PO">
        <FormControlTextCareful {...fields.customer_po} />
      </FormRow>
    </Feature>

    <Feature featureName="order_quote_number">
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
        <FormControl componentClass="select" {...fields.channel_representative}>
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

EditOrderForm.propTypes = {
  created: PropTypes.string.isRequired,
  fields: PropTypes.shape({}).isRequired,
  shippings: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EditOrderForm;
