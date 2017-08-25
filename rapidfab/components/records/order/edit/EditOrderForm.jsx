import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import _ from 'lodash';

import Actions from 'rapidfab/actions';
import { getShippings, getUsers } from 'rapidfab/selectors';
import { Currencies } from 'rapidfab/constants';
import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';
import {
  ORDER_REGION_MAPPING,
  ORDER_SALES_MAPPING,
  ORDER_STATUS_MAP,
  ORDER_TYPE_MAPPING,
} from 'rapidfab/mappings';
import {
  FormControlTextArea,
  FormControlTextCareful,
} from 'rapidfab/components/formTools';

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
  'status',
  'uuid',
];

const statusOptionsMap = {
  pending: ['cancelled', 'confirmed'],
  confirmed: ['cancelled'],
  printing: ['cancelled'],
  printed: ['cancelled', 'shipping', 'complete'],
  shipping: ['cancelled', 'complete'],
};

const FormRow = ({ id, defaultMessage, children }) =>
  <FormGroup>
    <Col xs={3}>
      <ControlLabel>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />:
      </ControlLabel>
    </Col>
    <Col xs={9}>
      {children}
    </Col>
  </FormGroup>;

FormRow.propTypes = {
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const EditOrderFormComponent = ({
  created,
  fields,
  shippings,
  users,
  statusOptions,
}) =>
  <div>
    <FormRow id="field.name" defaultMessage="Name">
      <FormControl type="text" required {...fields.name} />
    </FormRow>

    <FormRow id="field.status" defaultMessage="Status">
      <FormControl componentClass="select" required {...fields.status}>
        <option value={fields.status.initialValue}>
          {ORDER_STATUS_MAP[fields.status.initialValue]}
        </option>
        {statusOptions
          ? statusOptions.map(status =>
              <option key={status} value={status}>
                {ORDER_STATUS_MAP[status]}
              </option>
            )
          : null}
      </FormControl>
    </FormRow>

    <FormRow id="field.shippingName" defaultMessage="Shipping Name">
      <FormControlTextCareful {...fields.shipping.name} />
    </FormRow>

    <FormRow id="field.order_owner" defaultMessage="Owner">
      <FormControl componentClass="select" {...fields.order_owner}>
        <option value="none">
          <FormattedMessage id="field.none" defaultMessage="None" />
        </option>
        {users.map(user =>
          <option key={user.uuid} value={user.uri}>
            {user.name}
          </option>
        )}
      </FormControl>
    </FormRow>

    <FormRow id="field.shippingAddress" defaultMessage="Shipping Address">
      <FormControl componentClass="textarea" {...fields.shipping.address} />
    </FormRow>

    <FormRow id="field.trackingNumber" defaultMessage="Tracking Number">
      <FormControlTextCareful {...fields.shipping.tracking} />
    </FormRow>

    <FormRow id="field.shippingType" defaultMessage="Shipping Type">
      <FormControl componentClass="select" {...fields.shipping.uri}>
        {_.map(shippings, shipping =>
          <option key={shipping.uri} value={shipping.uri}>
            {shipping.name}
          </option>
        )}
      </FormControl>
    </FormRow>

    <FormRow id="field.currency" defaultMessage="Currency">
      <FormControl componentClass="select" {...fields.currency}>
        {_.map(Currencies, currency =>
          <option key={currency} value={currency}>
            {currency}
          </option>
        )}
      </FormControl>
    </FormRow>

    <FormRow id="field.created" defaultMessage="Created">
      <FormControl.Static>
        {created
          ? <FormattedDateTime value={created} />
          : <em>
              <FormattedMessage id="notAvailable" defaultMessage="N/A" />
            </em>}
      </FormControl.Static>
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
          {Object.keys(ORDER_TYPE_MAPPING).map(type =>
            <option key={type} value={type}>
              {ORDER_TYPE_MAPPING[type]}
            </option>
          )}
        </FormControl>
      </FormRow>

      <FormRow id="field.sales_status" defaultMessage="Sales Status">
        <FormControl componentClass="select" {...fields.sales_status}>
          {Object.keys(ORDER_SALES_MAPPING).map(type =>
            <option key={type} value={type}>
              {ORDER_SALES_MAPPING[type]}
            </option>
          )}
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
          {users.map(user =>
            <option key={user.uuid} value={user.uri}>
              {user.name}
            </option>
          )}
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
          {users.map(user =>
            <option key={user.uuid} value={user.uri}>
              {user.name}
            </option>
          )}
        </FormControl>
      </FormRow>

      <FormRow id="field.region" defaultMessage="Region">
        <FormControl componentClass="select" {...fields.region}>
          <option value="none">
            <FormattedMessage id="field.none" defaultMessage="None" />
          </option>
          {Object.keys(ORDER_REGION_MAPPING).map(type =>
            <option key={type} value={type}>
              {ORDER_REGION_MAPPING[type]}
            </option>
          )}
        </FormControl>
      </FormRow>
    </Feature>

    <FormRow id="field.notes" defaultMessage="Notes">
      <FormControlTextArea {...fields.notes} />
    </FormRow>

    <FormRow id="field.due_date" defaultMessage="Due Date">
      <input type="date" {...fields.due_date} style={{ color: 'black' }} />
    </FormRow>
  </div>;

EditOrderFormComponent.propTypes = {
  created: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  shippings: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  statusOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class EditOrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = { statusOptions: [] };
  }

  componentDidUpdate() {
    const { fields } = this.props;
    const { statusOptions } = this.state;
    if (fields.status.value && statusOptions && !(statusOptions.length > 0)) {
      const initialStatusOptions = statusOptionsMap[fields.status.value];
      this.setState({ statusOptions: initialStatusOptions });
    }
  }

  render() {
    const { statusOptions } = this.state;

    const { created, fields, shippings, users } = this.props;

    return (
      <EditOrderFormComponent
        created={created}
        fields={fields}
        shippings={shippings}
        users={users}
        statusOptions={statusOptions}
      />
    );
  }
}

EditOrderForm.propTypes = {
  created: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  shippings: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => {
    Object.keys(payload).forEach(key => {
      if (payload[key] === 'none') {
        payload[key] = null;
      }
    });

    if (payload.due_date) {
      const date = new Date(payload.due_date);
      payload.due_date = date.toISOString();
    }

    dispatch(Actions.Api.wyatt.order.put(payload.uuid, payload));
  },
});

const mapStateToProps = state => {
  const initialValues = state.resources[state.routeUUID];

  // convert ISO date to yyyy-mm-dd for html input
  if (initialValues.due_date) {
    const date = new Date(initialValues.due_date);
    initialValues.due_date = date.toISOString().slice(0, 10);
  }

  const { created } = initialValues;
  const shippings = getShippings(state);
  const users = getUsers(state);

  return { initialValues, created, shippings, users };
};

export default reduxForm(
  {
    form: 'record.editForm',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(EditOrderForm);
