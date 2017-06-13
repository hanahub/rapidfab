import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM                            from "react-dom"
import * as BS                             from 'react-bootstrap'
import _                                   from "lodash"
import Fa                                  from 'react-fontawesome'
import { FormattedMessage }                from 'react-intl'
import { Currencies }                      from 'rapidfab/constants'
import Model                               from './models'


const SaveButtonTitle = ({  }) => (
  <span>
    <Fa name='floppy-o'/> <FormattedMessage id="button.save" defaultMessage='Save'/>
  </span>
)

class NewOrderForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numModel: 1,
      itar: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onAddModel = this.onAddModel.bind(this)
    this.onRemoveModel = this.onRemoveModel.bind(this)
    this.toggleItar = this.toggleItar.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()

    const bureau = this.props.bureau.uri;
    const quantity = _.parseInt(this.state.quantity);
    const {
      baseMaterial,
      currency,
      itar,
      name,
      shippingName,
      shippingAddress,
      shippingTracking,
      shippingType,
      supportMaterial,
      template,
      thirdPartyProvider,
    } = this.state;
    const model = itar ? null : ReactDOM.findDOMNode(this.refs.file).files;

    const payload = {
      bureau,
      currency,
      materials: {
        base: baseMaterial,
        support: supportMaterial,
      },
      model,
      name,
      quantity,
      shipping: {
        name: shippingName,
        address: shippingAddress,
        tracking: shippingTracking,
        uri: shippingType,
      },
      template,
      third_party_provider: thirdPartyProvider,
    };

    this.props.onSubmit(payload)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  onAddModel() {
    this.setState((prevState) => {
      return {numModel: prevState.numModel + 1};
    });
  }

  onRemoveModel() {
    this.setState((prevState) => {
      return {numModel: prevState.numModel - 1};
    });
  }

  toggleItar() {
    this.setState( prevState => {
      return { itar: !prevState.itar }
    });
  }

  render() {
    const { materials, shippings, providers, templates } = this.props;
    const baseMaterials = _.filter(materials, {type: "base"});
    const supportMaterials = _.filter(materials, {type: "support"});

    const {
      handleChange,
      onRemoveModel,
      toggleItar,
    } = this;
    const { numModel, itar } = this.state;

    const models = [...Array(numModel)].map( index => {
      return (
        <Model
          {...this.props}
          handleChange={handleChange}
          onRemoveModel={onRemoveModel}
          isOnly={numModel === 1}
          itar={itar}
        />
      );
    });

    return(
      <form onSubmit={this.onSubmit}>
        <BS.Row>
          <BS.Col xs={6}>
            <BS.Button href="#/plan/orders" bsSize="small">
              <Fa name='arrow-left'/> <FormattedMessage id="plan.orders" defaultMessage='Orders'/>
            </BS.Button>
          </BS.Col>
          <BS.Col xs={6}>
            <BS.ButtonToolbar className="pull-right">
              <BS.Button id="uxSave" type="submit" bsStyle="success" bsSize="small">
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
              <BS.FormControl type="text" required maxLength="255" onChange={this.handleChange} name="name"/>
            </BS.FormGroup>

            <BS.Panel header="Models">
              <BS.Checkbox checked={itar} onClick={toggleItar}>
                ITAR Order
              </BS.Checkbox>
              <hr/>
              {models}
              <hr />
              <BS.Col md={1} mdOffset={11}>
                <BS.Button onClick={this.onAddModel} bsSize="small">
                  Add Model
                </BS.Button>
              </BS.Col>
            </BS.Panel>

            {
              supportMaterials.length > 0 ?
              <BS.FormGroup controlId="uxSupportMaterials">
                <BS.ControlLabel><FormattedMessage id="field.supportMaterials" defaultMessage='Support Materials'/>:</BS.ControlLabel>
                <BS.FormControl componentClass="select" onChange={this.handleChange} name="supportMaterial">
                  <option key="placeholder" value="" selected>No Support</option>
                  {_.map(supportMaterials, material => (
                    <option key={material.uri} value={material.uri}>{material.name}</option>
                  ))}
                </BS.FormControl>
              </BS.FormGroup>
              : null
            }
            <BS.FormGroup controlId="uxShippingName">
              <BS.ControlLabel><FormattedMessage id="field.shippingName" defaultMessage='Shipping Name'/>:</BS.ControlLabel>
              <BS.FormControl type="text" onChange={this.handleChange} name="shippingName"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxShippingAddress">
              <BS.ControlLabel><FormattedMessage id="field.shippingAddress" defaultMessage='Shipping Address'/>:</BS.ControlLabel>
              <BS.FormControl type="text" onChange={this.handleChange} name="shippingAddress"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxTrackingNumber">
              <BS.ControlLabel><FormattedMessage id="field.trackingNumber" defaultMessage='Tracking Number'/>:</BS.ControlLabel>
              <BS.FormControl type="text" onChange={this.handleChange} name="shippingTracking"/>
            </BS.FormGroup>

            <BS.FormGroup controlId="uxshippingType">
              <BS.ControlLabel><FormattedMessage id="field.shippingType" defaultMessage='Shipping Type'/>:</BS.ControlLabel>
              <BS.FormControl componentClass="select" required onChange={this.handleChange} name="shippingType">
                <option key="placeholder" value="" selected disabled>Select a shipping type</option>
                {_.map(shippings, shipping => (
                  <option key={shipping.uri} value={shipping.uri}>{shipping.name}</option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>
            {
              providers.length > 0 ?
              <BS.FormGroup controlId="uxThirdPartyProvider">
                <BS.ControlLabel><FormattedMessage id="field.thirdPartyProvider" defaultMessage='Third Party Provider'/>:</BS.ControlLabel>
                <BS.FormControl componentClass="select" onChange={this.handleChange} name="thirdPartyProvider">
                  <option key="placeholder" value="" selected disabled>Select a Third Party Provider</option>
                  {_.map(providers, provider => (
                    <option key={provider.uri} value={provider.uri}>{provider.name}</option>
                  ))}
                </BS.FormControl>
              </BS.FormGroup>
              : null
            }

            <BS.FormGroup controlId="uxCurrency">
              <BS.ControlLabel><FormattedMessage id="field.currency" defaultMessage='Currency'/>:</BS.ControlLabel>
              <BS.FormControl componentClass="select" required onChange={this.handleChange} name="currency" placeholder="Select a Currency">
                <option key="placeholder" value="" selected disabled>Select a Currency</option>
                {_.map(Currencies, currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </BS.FormControl>
            </BS.FormGroup>
          </BS.Col>
        </BS.Row>
      </form>
    )
  }
}

export default NewOrderForm
