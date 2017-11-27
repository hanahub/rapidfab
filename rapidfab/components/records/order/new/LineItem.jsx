import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Fa from 'react-fontawesome';
import {
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
} from 'react-bootstrap';

import * as Selectors from 'rapidfab/selectors';

import Feature from 'rapidfab/components/Feature';

const FileInput = ({ itar, onFileInputChange, value }) => {
  if (itar) return <p>ITAR Model</p>;
  return (
    <input
      name="model"
      type="file"
      className="input-medium"
      accept=".stl"
      required
      value={value}
      onChange={onFileInputChange}
    />
  );
};

FileInput.propTypes = {
  itar: PropTypes.bool.isRequired,
  onFileInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const LineItemComponent = ({
  baseMaterials,
  lineItem,
  onDelete,
  onFileInputChange,
  onInputChange,
  providers,
  supportMaterials,
  templates,
}) => (
  <FormGroup controlId="uxModel">
    <fieldset>
      <Feature featureName={'itar'}>
        <Col lg={2}>
          <ControlLabel>
            <span>ITAR Model</span>
          </ControlLabel>
          <Checkbox
            name="itar"
            checked={lineItem.itar}
            onChange={onInputChange}
          />
        </Col>
      </Feature>
      {lineItem.itar ? null : (
        <Col md={2}>
          <ControlLabel>
            <FormattedMessage id="field.file" defaultMessage="File" />:
          </ControlLabel>
          <FileInput
            itar={false}
            value={lineItem.value}
            onFileInputChange={onFileInputChange}
          />
        </Col>
      )}
      <Col md={2}>
        <ControlLabel>
          <FormattedMessage id="field.material" defaultMessage="Material" />:
        </ControlLabel>
        <FormControl
          name="baseMaterial"
          componentClass="select"
          required
          value={lineItem.baseMaterial}
          onChange={onInputChange}
        >
          {baseMaterials.map(material => (
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          ))}
        </FormControl>
      </Col>
      <Col md={2}>
        <ControlLabel>
          <FormattedMessage
            id="field.supportMaterial"
            defaultMessage="Support Material"
          />:
        </ControlLabel>
        <FormControl
          name="supportMaterial"
          componentClass="select"
          value={lineItem.supportMaterial}
          onChange={onInputChange}
        >
          <option value="none">
            <FormattedMessage id="field.none" defaultMessage="None" />
          </option>
          {supportMaterials.map(material => (
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          ))}
        </FormControl>
      </Col>
      <Col md={1}>
        <ControlLabel>
          <FormattedMessage id="field.quantity" defaultMessage="Quantity" />:
        </ControlLabel>
        <FormControl
          name="quantity"
          type="number"
          min="1"
          required
          value={lineItem.quantity}
          onChange={onInputChange}
        />
      </Col>
      <Col md={2}>
        <ControlLabel>
          <FormattedMessage id="field.template" defaultMessage="Template" />:
        </ControlLabel>
        <FormControl
          name="template"
          componentClass="select"
          required
          value={lineItem.template}
          onChange={onInputChange}
        >
          {templates.map(template => (
            <option key={template.uri} value={template.uri}>
              {template.name}
            </option>
          ))}
        </FormControl>
      </Col>
      <Col md={2}>
        <ControlLabel>
          <FormattedMessage
            id="field.thirdPartyProvider"
            defaultMessage="Third-Party Provider"
          />
        </ControlLabel>
        <FormControl
          name="thirdPartyProvider"
          componentClass="select"
          required
          value={lineItem.thirdPartyProvider}
          onChange={onInputChange}
        >
          <option value="none">
            <FormattedMessage id="field.none" defaultMessage="None" />
          </option>
          {providers.map(provider => (
            <option key={provider.uri} value={provider.uri}>
              {provider.name}
            </option>
          ))}
        </FormControl>
      </Col>
      {/* <Col md={2}>
        <ControlLabel>
          <FormattedMessage id="field.notes" defaultMessage='Notes'/>:
        </ControlLabel>
        <FormControl
          type="text"
          required
          maxLength="255"
          onChange={onInputChange}
          name="notes"
        />
      </Col> */}
      <Col md={1}>
        <br />
        <Button onClick={onDelete}>
          <span>
            <Fa name="minus" />
          </span>
        </Button>
      </Col>
    </fieldset>
  </FormGroup>
);

LineItemComponent.propTypes = {
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  lineItem: PropTypes.shape({}).isRequired,
  onDelete: PropTypes.func.isRequired,
  onFileInputChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class LineItem extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onDelete() {
    const { handleDeleteLineItem, index } = this.props;

    handleDeleteLineItem(index);
  }

  onFileInputChange(event) {
    const model = event.target.files[0];
    const { handleLineItemModelChange, index } = this.props;
    const lineItemChange = {
      updatedLineItemIndex: index,
      model,
    };

    handleLineItemModelChange(lineItemChange);
  }

  onInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const { handleLineItemChange, index } = this.props;
    const lineItemChange = {
      updatedLineItemIndex: index,
      name,
      value,
    };

    handleLineItemChange(lineItemChange);
  }

  render() {
    const { onDelete, onFileInputChange, onInputChange } = this;
    const {
      baseMaterials,
      lineItem,
      providers,
      supportMaterials,
      templates,
    } = this.props;

    return (
      <LineItemComponent
        baseMaterials={baseMaterials}
        lineItem={lineItem}
        onDelete={onDelete}
        onFileInputChange={onFileInputChange}
        onInputChange={onInputChange}
        providers={providers}
        supportMaterials={supportMaterials}
        templates={templates}
      />
    );
  }
}

LineItem.propTypes = {
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteLineItem: PropTypes.func.isRequired,
  handleLineItemModelChange: PropTypes.func.isRequired,
  handleLineItemChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  lineItem: PropTypes.shape({}).isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const materials = Selectors.getMaterials(state);
  const providers = Selectors.getThirdPartyProviders(state);
  const baseMaterials = materials.filter(material => material.type === 'base');
  const supportMaterials = materials.filter(
    material => material.type === 'support'
  );

  const templates = Selectors.getTemplates(state);

  return { baseMaterials, providers, supportMaterials, templates };
};

export default connect(mapStateToProps)(LineItem);
