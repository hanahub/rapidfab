import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import { Currencies, ORDER_STATUS_MAP }                       from 'rapidfab/constants'
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
        {_.map(models, model => (<option key={model.uri} value={model.uri}>{model.name}</option>))}
      </BS.FormControl>
    );
  }
}

const Printable = ({ models, uri }) => {
  let model = _.find(models, {uri})
  let printable = true

  if(model && !model.analyses.manifold) {
    printable = false
  }

  if(model) {
    if(printable) {
      return <BS.Label bsStyle="success"><FormattedMessage id="field.printable" defaultMessage='Printable'/></BS.Label>
    } else {
      return <BS.Label bsStyle="warning"><FormattedMessage id="field.unknown" defaultMessage='Unknown'/></BS.Label>
    }
  } else {
    return <BS.Label bsStyle="info"><FormattedMessage id="field.loading" defaultMessage='Loading'/></BS.Label>
  }
}

const OrderForm = ({ handleSubmit, fields, materials, models, modelsIsFetching, providers, shippings, statusOptions, postProcessorTypes }) => (
  <div>
    <FormRow id="field.id" defaultMessage="ID">
      <BS.FormControl.Static>
        {fields.id.value}
      </BS.FormControl.Static>
    </FormRow>

    <FormRow id="field.printable" defaultMessage="Printable">
      <BS.FormControl.Static>
        <Printable models={models} uri={fields.model.value}/>
      </BS.FormControl.Static>
    </FormRow>

    <FormRow id="field.name" defaultMessage="Name">
      <BS.FormControl type="text" required {...fields.name}/>
    </FormRow>

    <FormRow id="field.status" defaultMessage="Status">
      <BS.FormControl componentClass="select" required {...fields.status}>
        <option value={fields.status.value} disabled>{_.startCase(ORDER_STATUS_MAP[fields.status.value] || fields.status.value)}</option>
        {_.map(statusOptions[fields.status.value], status => (<option key={status} value={status}>{_.startCase(ORDER_STATUS_MAP[status] || status)}</option>))}
      </BS.FormControl>
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
        {_.map(_.filter(materials, {type: "base"}), material => (<option key={material.uri} value={material.uri}>{material.name}</option>))}
      </BS.FormControl>
    </FormRow>

    <FormRow id="field.supportMaterial" defaultMessage="Support Material">
      <BS.FormControl componentClass="select" {...fields.materials.support}>
        <option value="">None</option>
        {_.map(_.filter(materials, {type: "support"}), material => (<option key={material.uri} value={material.uri}>{material.name}</option>))}
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

    <FormRow id="field.postProcessorType" defaultMessage="Post Processor Type">
      <BS.FormControl componentClass="select" {...fields.post_processor_type}>
        <option key="placeholder" value="" selected>Select a Post Processor Type</option>
        {_.map(postProcessorTypes, pp_type => (
          <option key={pp_type.uri} value={pp_type.uri}>{pp_type.name}</option>
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
