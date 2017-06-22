import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  ButtonToolbar,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Panel,
} from 'react-bootstrap';

import * as Selectors from 'rapidfab/selectors';

const AddLineItemPresentation = ({
    baseMaterial,
    baseMaterials,
    handleFileChange,
    handleInputChange,
    notes,
    onSubmit,
    quantity,
    supportMaterial,
    supportMaterials,
    template,
    templates,
}) => (
  <Panel header="Add Line Item">
    <Form>
      <Col lg={2}>
        <FormGroup>
          <ControlLabel>
            <FormattedMessage id="field.file" defaultMessage='File'/>:
          </ControlLabel>
          <FormControl
            name="model"
            type="file"
            accept=".stl"
            required
            onChange={handleFileChange}
          />
        </FormGroup>
      </Col>
      <Col lg={2}>
        <ControlLabel>
          <FormattedMessage id="field.material" defaultMessage='Material'/>:
        </ControlLabel>
        <FormControl
          name="baseMaterial"
          componentClass="select"
          onChange={handleInputChange}
          value={baseMaterial}
          required
        >
          {baseMaterials.map( material => (
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          ))}
        </FormControl>
      </Col>
      <Col lg={2}>
        <ControlLabel>
          <FormattedMessage
            id="field.supportMaterial"
            defaultMessage='Support Material'
          />:
        </ControlLabel>
        <FormControl
          name="supportMaterial"
          componentClass="select"
          onChange={handleInputChange}
          value={supportMaterial}
        >
          {supportMaterials.map( material => (
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          ))}
        </FormControl>
      </Col>
      <Col lg={1}>
        <ControlLabel>
          <FormattedMessage id="field.quantity" defaultMessage='Quantity'/>:
        </ControlLabel>
        <FormControl
          name="quantity"
          type="number"
          min="1"
          required
          onChange={handleInputChange}
          value={quantity}
        />
      </Col>
      <Col lg={2}>
        <ControlLabel>
          <FormattedMessage id="field.template" defaultMessage='Template'/>:
        </ControlLabel>
        <FormControl
          name="template"
          componentClass="select"
          required
          onChange={handleInputChange}
          value={template}
        >
          {templates.map( template => (
            <option key={template.uri} value={template.uri}>
              {template.name}
            </option>
          ))}
        </FormControl>
      </Col>
      <Col lg={2}>
        <ControlLabel>
          <FormattedMessage
            id="field.notes"
            defaultMessage='Notes'
          />:
        </ControlLabel>
        <FormControl
          name="notes"
          type="text"
          maxLength="255"
          onChange={handleInputChange}
        />
      </Col>
      <Col lg={1}>
        <ButtonToolbar className="clearfix" >
          <Button
            type="submit"
            onClick={onSubmit}
            bsStyle="success"
            className="pull-right"
            style={{marginTop: "2rem"}}
          >
            Add
          </Button>
        </ButtonToolbar>
      </Col>
    </Form>
  </Panel>
);

class AddLineItem extends Component {
  constructor(props) {
    super(props)

    const { baseMaterials, supportMaterials, templates } = props;
    const baseMaterial = baseMaterials[0];
    const supportMaterial = supportMaterials.length > 0 ? supportMaterials[0] : null;
    const template = templates[0];

    this.state = {
      baseMaterial,
      supportMaterial,
      template,
    }

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    // TODO: Implement Payload
    event.preventDefault();
    console.log('Submit');
  }

  render() {
    const {
      props,
      state,
      handleFileChange,
      handleInputChange,
      onSubmit
    } = this;
    return (
      <AddLineItemPresentation
        {...props}
        {...state}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    )
  }
}
const mapStateToProps = (state) => {
  const materials = Selectors.getMaterials(state);
  const templates = Selectors.getTemplates(state);

  const baseMaterials = materials.filter( material => material.type === 'base');
  const supportMaterials = materials.filter( material => material.type === 'support');

  return { baseMaterials, supportMaterials, templates };
}

export default connect(mapStateToProps)(AddLineItem)
