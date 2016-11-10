import React, { PropTypes }     from "react"
import * as BS                  from 'react-bootstrap'
import _                        from "lodash"
import Fa                       from 'react-fontawesome'
import { FormattedMessage }     from 'react-intl'


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

const NewOrderForm = ({ fields, materials, providers, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <BS.Row>
      <BS.Col xs={6}>
        <BS.Button href="#/plan/orders" bsSize="small">
          <Fa name='arrow-left'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
        </BS.Button>
      </BS.Col>
      <BS.Col xs={6}>
        <BS.ButtonToolbar className="pull-right">
          <BS.Button id="uxSave" type="submit" bsStyle="success" bsSize="small" pullRight>
            <SaveButtonTitle />
          </BS.Button>
        </BS.ButtonToolbar>
      </BS.Col>
    </BS.Row>

    <hr/>

    <BS.Row>
      <BS.Col xs={12}>
        <BS.FormGroup controlId="uxName">
          <BS.ControlLabel><FormattedMessage id="field.name" defaultMessage='Name'/>:</BS.ControlLabel>
          <BS.FormControl type="text" required {...fields.name}/>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxModel">
          <BS.ControlLabel><FormattedMessage id="field.model" defaultMessage='Model'/>:</BS.ControlLabel>
          <BS.FormControl type="file" {...fields.model} value={null} required />
        </BS.FormGroup>

        <BS.FormGroup controlId="uxQuantity">
          <BS.ControlLabel><FormattedMessage id="field.quantity" defaultMessage='Quantity'/>:</BS.ControlLabel>
          <BS.FormControl type="number" required {...fields.quantity}/>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxBaseMaterials">
          <BS.ControlLabel><FormattedMessage id="field.baseMaterials" defaultMessage='Base Materials'/>:</BS.ControlLabel>
          <BS.FormControl componentClass="select" required {...fields.materials.base}>
            <option key="placeholder" value="" selected disabled>Select a Base Material</option>
            {_.map(materials, material => (
              <option key={material.uri} value={material.uri}>{material.name}</option>
            ))}
          </BS.FormControl>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxSupportMaterials">
          <BS.ControlLabel><FormattedMessage id="field.supportMaterials" defaultMessage='Support Materials'/>:</BS.ControlLabel>
          <BS.FormControl componentClass="select" {...fields.materials.support}>
            <option key="placeholder" value="" selected disabled>No Support</option>
            {_.map(materials, material => (
              <option key={material.uri} value={material.uri}>{material.name}</option>
            ))}
          </BS.FormControl>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxShippingName">
          <BS.ControlLabel><FormattedMessage id="field.shippingName" defaultMessage='Shipping Name'/>:</BS.ControlLabel>
          <BS.FormControl type="text" {...fields.shipping.name}/>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxShippingAddress">
          <BS.ControlLabel><FormattedMessage id="field.shippingAddress" defaultMessage='Shipping Address'/>:</BS.ControlLabel>
          <BS.FormControl type="text" {...fields.shipping.address}/>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxTrackingNumber">
          <BS.ControlLabel><FormattedMessage id="field.trackingNumber" defaultMessage='Tracking Number'/>:</BS.ControlLabel>
          <BS.FormControl type="text" {...fields.shipping.tracking}/>
        </BS.FormGroup>

        <BS.FormGroup controlId="uxThirdPartyProvider">
          <BS.ControlLabel><FormattedMessage id="field.thirdPartyProvider" defaultMessage='Third Party Provider'/>:</BS.ControlLabel>
          <BS.FormControl componentClass="select" {...fields.thirdPartyProvider}>
            <option key="placeholder" value="" selected disabled>Select a Third Party Provider</option>
            {_.map(providers, provider => (
              <option key={provider.uri} value={provider.uri}>{provider.name}</option>
            ))}
          </BS.FormControl>
        </BS.FormGroup>

      </BS.Col>
    </BS.Row>
  </form>
)

export default NewOrderForm
