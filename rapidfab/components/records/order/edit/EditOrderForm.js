import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {
  FormControl,
  FormGroup,
  Col,
  ControlLabel
} from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import { getThirdPartyProviders, getShippings, getUsers } from 'rapidfab/selectors'
import { Currencies } from 'rapidfab/constants';
import { ORDER_STATUS_MAP } from 'rapidfab/mappings';
import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';
import {
  FormControlTextArea,
  FormControlTextCareful
} from 'rapidfab/components/formTools';

const fields = [
  'currency',
  'name',
  'order_owner',
  'shipping.name',
  'shipping.address',
  'shipping.tracking',
  'shipping.uri',
  'status',
  'uuid',
];

const statusOptionsMap = {
  pending  : ["cancelled", "confirmed"],
  confirmed: ["cancelled"],
  printing : ["cancelled"],
  printed  : ["cancelled", "shipping", "complete"],
  shipping : ["cancelled", "complete"],
};

const FormRow = ({id, defaultMessage, children}) => (
  <FormGroup>
    <Col xs={3}>
      <ControlLabel>
        <FormattedMessage id={id} defaultMessage={defaultMessage}/>:
      </ControlLabel>
    </Col>
    <Col xs={9}>
      {children}
    </Col>
  </FormGroup>
);

const EditOrderFormComponent = ({
  created,
  fields,
  shippings,
  users,
  statusOptions,
}) => (
  <div>

    <FormRow id="field.name" defaultMessage="Name">
      <FormControl type="text" required {...fields.name}/>
    </FormRow>

    <FormRow id="field.status" defaultMessage="Status">
      <FormControl componentClass="select" required {...fields.status}>
        <option value={fields.status.initialValue}>
          {ORDER_STATUS_MAP[fields.status.initialValue]}
        </option>
        { statusOptions ?
            statusOptions.map(status =>
              <option key={status} value={status}>
                {ORDER_STATUS_MAP[status]}
              </option>
            ) : null
        }
      </FormControl>
    </FormRow>

    <FormRow id="field.shippingName" defaultMessage="Shipping Name">
      <FormControlTextCareful {...fields.shipping.name}/>
    </FormRow>

    <FormRow id="field.order_owner" defaultMessage="Assign Owner">
      <FormControl componentClass="select" {...fields.order_owner}>
        {_.map(users, user => (
          <option key={user.uuid} value={user.uri}>
            {user.name}
          </option>
          ))
        }
      </FormControl>
    </FormRow>

    <FormRow id="field.shippingAddress" defaultMessage="Shipping Address">
      <FormControl componentClass="textarea" {...fields.shipping.address}/>
    </FormRow>

    <FormRow id="field.trackingNumber" defaultMessage="Tracking Number">
      <FormControlTextCareful {...fields.shipping.tracking}/>
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
        {created ?
          <FormattedDateTime value={created}/>
          : <em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>
        }
      </FormControl.Static>
    </FormRow>

  </div>
);

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

    const {
      created,
      fields,
      shippings,
      users,
    } = this.props;

    return(
      <EditOrderFormComponent
        created={created}
        fields={fields}
        shippings={shippings}
        users={users}
        statusOptions={statusOptions}
      />
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: payload => {
      if (false === !!payload.shipping.name) delete payload.shipping.name
      if (false === !!payload.shipping.address) delete payload.shipping.address
      if (false === !!payload.shipping.tracking) delete payload.shipping.tracking
      dispatch(Actions.Api.wyatt.order.put(payload.uuid, payload))
        .then( () => window.location.hash = "#/plan/orders" )
    }
  }
}

const mapStateToProps = (state) => {
  const initialValues = state.resources[state.routeUUID.uuid];
  const { created } = initialValues;
  const shippings = getShippings(state);
  const users = getUsers(state);

  return { initialValues, created, shippings, users };
};

export default reduxForm({
  form: 'record.editForm',
  fields,
}, mapStateToProps, mapDispatchToProps)(EditOrderForm)
