import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import { Currencies }                                         from 'rapidfab/constants'
import {
  FormattedDateTime,
  FormattedMessage
} from 'rapidfab/i18n';

import {
  FormControlTextArea,
  FormControlTextCareful
} from 'rapidfab/components/formTools';


const FormRow = ({id, defaultMessage, children}) => (
  <BS.FormGroup>
    <BS.Col xs={3}>
      <BS.ControlLabel><FormattedMessage id={id} defaultMessage={defaultMessage}/>:</BS.ControlLabel>
    </BS.Col>
    <BS.Col xs={9}>
      {children}
    </BS.Col>
  </BS.FormGroup>
)

const ModelSelect = ({models, modelsIsFetching, field}) => {
  if(modelsIsFetching) {
    return (
      <BS.FormControl.Static>
        <FormattedMessage id="loading.model" defaultMessage="Loading models..."/>
      </BS.FormControl.Static>
    );
  } else {
    return (
      <BS.FormControl componentClass="select" required {...field}>
        <option value="" disabled>Select a Model</option>
        {_.map(models, model => (<option key={model.uri} value={model.uri}>{`${model.id} - ${model.name}`}</option>))}
      </BS.FormControl>
    );
  }
}

const OrderForm = ({ handleSubmit, fields, materials, models, modelsIsFetching, providers, shippings }) => (
  <div>
    <FormRow id="field.id" defaultMessage="ID">
      <BS.FormControl.Static>
        {fields.id.value}
      </BS.FormControl.Static>
    </FormRow>

    <FormRow id="field.name" defaultMessage="Name">
      <BS.FormControl type="text" required {...fields.name}/>
    </FormRow>

    <FormRow id="field.model" defaultMessage="Model">
      <ModelSelect models={models} modelsIsFetching={modelsIsFetching} field={fields.model}/>
    </FormRow>

    <FormRow id="field.quantity" defaultMessage="Quantity">
      <BS.FormControl type="number" required {...fields.quantity}/>
    </FormRow>

    <FormRow id="field.baseMaterial" defaultMessage="Base Material">
      <BS.FormControl componentClass="select" required {...fields.materials.base}>
        <option value="" disabled>Select a Material</option>
        {_.map(materials, material => (<option key={material.uri} value={material.uri}>{`${material.id} - ${material.name}`}</option>))}
      </BS.FormControl>
    </FormRow>

    <FormRow id="field.supportMaterial" defaultMessage="Support Material">
      <BS.FormControl componentClass="select" {...fields.materials.support}>
        <option value="">None</option>
        {_.map(materials, material => (<option key={material.uri} value={material.uri}>{`${material.id} - ${material.name}`}</option>))}
      </BS.FormControl>
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
      <BS.FormControl componentClass="select" {...fields.shipping.uri}>
        <option key="placeholder" value="" selected disabled>Select shipping type</option>
          {_.map(shippings, shipping => (
            <option key={shipping.uri} value={shipping.uri}>{shipping.name}</option>
          ))}
      </BS.FormControl>
    </FormRow>

    <FormRow id="field.thirdPartyProvider" defaultMessage="Third-Party Provider">
      <BS.FormControl componentClass="select" {...fields.third_party_provider}>
        <option key="placeholder" value="" selected disabled>Select a Third Party Provider</option>
        {_.map(providers, provider => (
          <option key={provider.uri} value={provider.uri}>{provider.name}</option>
        ))}
      </BS.FormControl>
    </FormRow>

    <FormRow id="field.currency" defaultMessage="Currency">
      <BS.FormControl componentClass="select" {...fields.currency}>
        <option key="placeholder" value="" selected disabled>Select a currency</option>
          {_.map(Currencies, currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
      </BS.FormControl>
    </FormRow>

    <FormRow id="field.created" defaultMessage="Created">
      <BS.FormControl.Static>
        {fields.created.value ?
          <FormattedDateTime value={fields.created.value}/> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.FormControl.Static>
    </FormRow>
  </div>
)

export default OrderForm
