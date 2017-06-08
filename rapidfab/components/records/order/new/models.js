import React, { Component, PropTypes }     from "react"
import ReactDOM                            from "react-dom"
import * as BS                             from 'react-bootstrap'
import { FormattedMessage }                from 'react-intl'
import Fa                                  from 'react-fontawesome'

class Model extends Component {
  constructor(props) {
    super(props)
  }
 
  render() {
    const { materials, shippings, providers, templates } = this.props;
    const baseMaterials = _.filter(materials, {type: "base"});
    const supportMaterials = _.filter(materials, {type: "support"});

    return(
      <BS.FormGroup controlId="uxModel">
        <fieldset class="form-inline">
          <BS.Col md={2}>
            <BS.ControlLabel><FormattedMessage id="field.model" defaultMessage='Model'/>:</BS.ControlLabel>
            <input type="file" class="input-medium" accept=".stl" ref="file" required name="file" />
          </BS.Col>
          <BS.Col md={2}>
            <BS.ControlLabel><FormattedMessage id="field.material" defaultMessage='Material'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required onChange={this.handleChange} name="baseMaterial">
              <option key="placeholder" value="" selected disabled></option>
              {_.map(baseMaterials, material => (
                <option key={material.uri} value={material.uri}>{material.name}</option>
              ))}
            </BS.FormControl>
          </BS.Col>
          <BS.Col md={2}>
            <BS.ControlLabel><FormattedMessage id="field.supportMaterial" defaultMessage='Support Material'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required onChange={this.handleChange} name="supportMaterial">
              <option key="placeholder" value="" selected disabled></option>
              {_.map(baseMaterials, material => (
                <option key={material.uri} value={material.uri}>{material.name}</option>
              ))}
            </BS.FormControl>
          </BS.Col>
          <BS.Col md={1}>
            <BS.ControlLabel><FormattedMessage id="field.quantity" defaultMessage='Quantity'/>:</BS.ControlLabel>
            <BS.FormControl type="number" min="1" required onChange={this.handleChange} name="quantity"/>
          </BS.Col>
          <BS.Col md={2}>
            <BS.ControlLabel><FormattedMessage id="field.template" defaultMessage='Template'/>:</BS.ControlLabel>
            <BS.FormControl componentClass="select" required onChange={this.handleChange} name="template">
              <option key="placeholder" value="" selected disabled>Select a Template</option>
              {_.map(templates, template => (
                <option key={template.uri} value={template.uri}>{template.name}</option>
              ))}
            </BS.FormControl>
          </BS.Col>
          <BS.Col md={2}>
            <BS.ControlLabel><FormattedMessage id="field.notes" defaultMessage='Notes'/>:</BS.ControlLabel>
            <BS.FormControl type="text" required maxLength="255" onChange={this.handleChange} name="notes"/>
          </BS.Col>
          <BS.Col md={1}>
            <br />
              <BS.Button onClick={this.props.onRemoveModel}>
                <span>
                  <Fa name='minus'/>
                </span>
              </BS.Button>
          </BS.Col>
        </fieldset>
      </BS.FormGroup>
    )
  }
}

export default Model
