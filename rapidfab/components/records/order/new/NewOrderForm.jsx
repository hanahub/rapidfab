import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';

import { getShippings, getUsers } from 'rapidfab/selectors';
import { Currencies } from 'rapidfab/constants';
import { FormattedMessage } from 'rapidfab/i18n';
import {
  FormControlTextArea,
  FormControlTextCareful,
} from 'rapidfab/components/formTools';
import {
  ORDER_REGION_MAPPING,
  ORDER_SALES_MAPPING,
  ORDER_TYPE_MAPPING,
} from 'rapidfab/mappings';

import Feature from 'rapidfab/components/Feature';

const fields = [
  'channel_representative',
  'currency',
  'due_date',
  'customer_email',
  'customer_name',
  'name',
  'notes',
  'order_owner',
  'order_type',
  'region',
  'sales_representative',
  'sales_status',
  'shipping.name',
  'shipping.address',
  'shipping.tracking',
  'shipping.uri',
];

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

const NewOrderForm = ({ fields, shippings, users }) => (
  <div>
    <FormRow id="field.name" defaultMessage="Name">
      <FormControl type="text" required {...fields.name} />
    </FormRow>

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

    <FormRow id="field.shippingName" defaultMessage="Shipping Name">
      <FormControlTextCareful {...fields.shipping.name} />
    </FormRow>

    <FormRow id="field.shippingAddress" defaultMessage="Shipping Address">
      <FormControlTextArea {...fields.shipping.address} />
    </FormRow>

    <FormRow id="field.trackingNumber" defaultMessage="Tracking Number">
      <FormControlTextCareful {...fields.shipping.tracking} />
    </FormRow>

    <FormRow id="field.shippingType" defaultMessage="Shipping Type">
      <FormControl componentClass="select" {...fields.shipping.uri}>
        {shippings.map(shipping => (
          <option key={shipping.uri} value={shipping.uri}>
            {shipping.name}
          </option>
        ))}
      </FormControl>
    </FormRow>

    <FormRow id="field.currency" defaultMessage="Currency">
      <FormControl componentClass="select" {...fields.currency}>
        {Currencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </FormControl>
    </FormRow>

    <FormRow id="field.customer_email" defaultMessage="Customer Email">
      <FormControlTextCareful {...fields.customer_email} />
    </FormRow>

    <FormRow id="field.customer_name" defaultMessage="Customer Name">
      <FormControlTextCareful {...fields.customer_name} />
    </FormRow>

    <Feature featureName="eos-order-fields">
      <FormRow id="field.orderType" defaultMessage="Order Type">
        <FormControl componentClass="select" {...fields.order_type}>
          <option value="none">
            <FormattedMessage id="field.none" defaultMessage="None" />
          </option>
          {Object.keys(ORDER_TYPE_MAPPING).map(type => (
            <option key={type} value={type}>
              {ORDER_TYPE_MAPPING[type]}
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
      <input type="date" {...fields.due_date} style={{ color: 'black' }} />
    </FormRow>
  </div>
);

NewOrderForm.propTypes = {
  fields: PropTypes.object.isRequired,
  shippings: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const shippings = getShippings(state);
  const users = getUsers(state);

  const initialCurrency = Currencies[0];
  const initialSalesStatus = Object.keys(ORDER_SALES_MAPPING)[0];
  const initialShipping = shippings[0] ? shippings[0].uri : null;

  const initialValues = {
    currency: initialCurrency,
    sales_status: initialSalesStatus,
    shipping: {
      uri: initialShipping,
    },
  };

  return { initialValues, shippings, users };
};

export default reduxForm(
  {
    form: 'record.order',
    fields,
  },
  mapStateToProps
)(NewOrderForm);
