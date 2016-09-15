import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedDate,
  FormattedMessage
} from 'rapidfab/i18n';

import {
  FormControlTextArea,
  FormControlTextCareful
} from 'rapidfab/components/formTools';


const FormRow = ({controlId, id, defaultMessage, children}) => (
  <BS.FormGroup>
    <BS.Col xs={3} controlId={controlId}>
      <BS.ControlLabel><FormattedMessage id={id} defaultMessage={defaultMessage}/>:</BS.ControlLabel>
    </BS.Col>
    <BS.Col xs={9}>
      {children}
    </BS.Col>
  </BS.FormGroup>
)

const ModelSelect = ({models, value}) => {
  if(models.length) {
    return (
      <BS.FormControl componentClass="select" required value={value}>
        <option value="" disabled>Select a Model</option>
        {_.map(models, model => (<option key={model.uri} value={model.uri}>{`${model.id} - ${model.name}`}</option>))}
      </BS.FormControl>
    );
  } else {
    return (
      <BS.FormControl.Static>
        <FormattedMessage id="loading.model" defaultMessage="Loading models..."/>
      </BS.FormControl.Static>
    );
  }
}

const OrderForm = ({ handleSubmit, fields, materials, models, providers }) => (
  <div>
    <FormRow controlId="uxId" id="field.id" defaultMessage="ID">
      <BS.FormControl.Static>
        {fields.id.value}
      </BS.FormControl.Static>
    </FormRow>

    <FormRow controlId="uxName" id="field.name" defaultMessage="Name">
      <BS.FormControl type="text" required {...fields.name}/>
    </FormRow>

    <FormRow controlId="uxModel" id="field.model" defaultMessage="Model">
      <ModelSelect models={models} {...fields.model}/>
    </FormRow>

    <FormRow controlId="uxQuantity" id="field.quantity" defaultMessage="Quantity">
      <BS.FormControl type="number" required {...fields.quantity}/>
    </FormRow>

    <FormRow controlId="uxBaseMaterial" id="field.baseMaterial" defaultMessage="Base Material">
      <BS.FormControl componentClass="select" required {...fields.materials.base}>
        <option value="" disabled>Select a Material</option>
        {_.map(materials, material => (<option key={material.uri} value={material.uri}>{`${material.id} - ${material.name}`}</option>))}
      </BS.FormControl>
    </FormRow>

    <FormRow controlId="uxSupportMaterial" id="field.supportMaterial" defaultMessage="Support Material">
      <BS.FormControl componentClass="select" {...fields.materials.support}>
        <option value="">None</option>
        {_.map(materials, material => (<option key={material.uri} value={material.uri}>{`${material.id} - ${material.name}`}</option>))}
      </BS.FormControl>
    </FormRow>

    <FormRow controlId="uxShippingName" id="field.shippingName" defaultMessage="Shipping Name">
      <FormControlTextCareful {...fields.shipping.name}/>
    </FormRow>

    <FormRow controlId="uxShippingAddress" id="field.shippingAddress" defaultMessage="Shipping Address">
      <FormControlTextArea {...fields.shipping.address}/>
    </FormRow>

    <FormRow controlId="uxTrackingNumber" id="field.trackingNumber" defaultMessage="Tracking Number">
      <FormControlTextCareful {...fields.shipping.tracking}/>
    </FormRow>

    <FormRow controlId="uxThirdPartyProvider" id="field.thirdPartyProvider" defaultMessage="Third-Party Provider">
      <BS.FormControl componentClass="select" {...fields.third_party_provider}>
        <option key="placeholder" value="" selected disabled>Select a Third Party Provider</option>
        {_.map(providers, provider => (
          <option key={provider.uri} value={provider.uri}>{provider.name}</option>
        ))}
      </BS.FormControl>
    </FormRow>

    <FormRow controlId="uxCreated" id="field.created" defaultMessage="Created">
      <BS.FormControl.Static>
        {fields.created.value ?
          <FormattedDate value={fields.created.value}/> :
            (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
        }
      </BS.FormControl.Static>
    </FormRow>
  </div>
)

export default OrderForm
