import React, { PropTypes }                                   from "react";
import * as BS                                                from 'react-bootstrap';
import Fa                                                     from 'react-fontawesome';
import {
  FormattedDate,
  FormattedMessage
} from 'rapidfab/i18n';


const OrderForm = ({ handleSubmit, fields, materials, models, providers }) => (
  <div>
    <BS.FormGroup>
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.id" defaultMessage='Id'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl.Static>
          {fields.id.value}
        </BS.FormControl.Static>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxName">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl type="text" required {...fields.name}/>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxModel">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.model" defaultMessage='Model'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl componentClass="select" required {...fields.model}>
          <option value="" disabled>Select a Model</option>
          {_.map(models, model => (<option key={model.uri} value={model.uri}>{`${model.id} - ${model.name}`}</option>))}
        </BS.FormControl>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxQuantity">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.quantity" defaultMessage='Quantity'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl type="number" required {...fields.quantity}/>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxBaseMaterial">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.baseMaterial" defaultMessage='Base Material'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl componentClass="select" required {...fields.materials.base}>
          <option value="" disabled>Select a Material</option>
          {_.map(materials, material => (<option key={material.uri} value={material.uri}>{`${material.id} - ${material.name}`}</option>))}
        </BS.FormControl>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxSupportMaterial">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.supportMaterial" defaultMessage='Support Material'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl componentClass="select" {...fields.materials.support}>
          <option value="">None</option>
          {_.map(materials, material => (<option key={material.uri} value={material.uri}>{`${material.id} - ${material.name}`}</option>))}
        </BS.FormControl>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxShippingName">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.shipping_name" defaultMessage='Shipping Name'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl componentClass="text" required {...fields.shipping.name}/>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxShippingAddress">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.shipping_address" defaultMessage='Shipping Address'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl componentClass="textarea" required {...fields.shipping.address}/>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxTrackingNumber">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.tracking_number" defaultMessage='Tracking Number'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl componentClass="input" required {...fields.shipping.tracking}/>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxThirdPartyProvider">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.third_party_provider" defaultMessage='Third Party Provider'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl componentClass="select" {...fields.third_party_provider}>
          <option key="placeholder" value="" selected disabled>Select a Third Party Provider</option>
          {_.map(providers, provider => (
            <option key={provider.uri} value={provider.uri}>{provider.name}</option>
          ))}
        </BS.FormControl>
      </BS.Col>
    </BS.FormGroup>

    <BS.FormGroup controlId="uxCreated">
      <BS.Col xs={3}>
        <BS.ControlLabel><FormattedMessage id="field.created" defaultMessage='Created'/>:</BS.ControlLabel>
      </BS.Col>
      <BS.Col xs={9}>
        <BS.FormControl.Static>
          {fields.created.value ?
            <FormattedDate value={fields.created.value}/> :
              (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
          }
        </BS.FormControl.Static>
      </BS.Col>
    </BS.FormGroup>
  </div>
)

export default OrderForm
