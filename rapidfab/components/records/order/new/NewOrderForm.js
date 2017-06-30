import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {
  FormControl,
  FormGroup,
  Col,
  ControlLabel
} from 'react-bootstrap';

import { getThirdPartyProviders, getShippings } from 'rapidfab/selectors'
import { Currencies } from 'rapidfab/constants';
import { FormattedDateTime, FormattedMessage } from 'rapidfab/i18n';
import {
  FormControlTextArea,
  FormControlTextCareful }
from 'rapidfab/components/formTools';

import LineItem from './LineItem';

const fields = [
  'currency',
  'name',
  'shipping.name',
  'shipping.address',
  'shipping.tracking',
  'shipping.uri',
  'third_party_provider',
];

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

const NewOrderForm = ({
  fields,
  providers,
  shippings,
}) => (
  <div>

    <FormRow id="field.name" defaultMessage="Name">
      <FormControl type="text" required {...fields.name}/>
    </FormRow>

    <FormRow id="field.shippingName" defaultMessage="Shipping Name">
      <FormControlTextCareful {...fields.shipping.name}/>
    </FormRow>

    <FormRow id="field.shippingAddress" defaultMessage="Shipping Address">
      <FormControlTextArea {...fields.shipping.address}/>
    </FormRow>

    <FormRow id="field.trackingNumber" defaultMessage="Tracking Number">
      <FormControlTextCareful {...fields.shipping.tracking}/>
    </FormRow>

    <FormRow id="field.shippingType" defaultMessage="Shipping Type">
      <FormControl componentClass="select" {...fields.shipping.uri}>
        {shippings.map(shipping => (
          <option key={shipping.uri} value={shipping.uri}>
            {shipping.name}
          </option>
          ))
        }
      </FormControl>
    </FormRow>

    <FormRow id="field.thirdPartyProvider" defaultMessage="Third-Party Provider">
      <FormControl componentClass="select" {...fields.third_party_provider}>
        {providers.map(provider => (
          <option key={provider.uri} value={provider.uri}>
            {provider.name}
          </option>
          ))
        }
      </FormControl>
    </FormRow>

    <FormRow id="field.currency" defaultMessage="Currency">
      <FormControl componentClass="select" {...fields.currency}>
        {Currencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
          ))
        }
      </FormControl>
    </FormRow>

  </div>
);

const mapStateToProps = (state) => {
  const providers = getThirdPartyProviders(state);
  const shippings = getShippings(state);

  const initialCurrency = Currencies[0];
  const initialShipping = shippings[0] ? shippings[0].uri : null;
  const initialProvider = providers[0] ? providers[0].uri : null;

  const initialValues = {
    currency: initialCurrency,
    shipping: {
      uri: initialShipping
    },
    'third_party_provider': initialProvider,
  }

  return { initialValues, providers, shippings };
};

export default reduxForm({
  form: 'record.order',
  fields,
}, mapStateToProps)(NewOrderForm)
