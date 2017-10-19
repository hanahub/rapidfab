import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Form, FormControl, InputGroup, Label } from 'react-bootstrap';
import Fa from 'react-fontawesome';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import { ORDER_STATUS_MAP } from 'rapidfab/mappings';
import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

import FormRow from 'rapidfab/components/FormRow';
import SaveDropdownButton from './SaveDropdownButton';

const ResourceLink = ({ href }) => (
  <a href={href}>
    Go <Fa name="external-link" />
  </a>
);

const statusOptionsMap = {
  pending: ['cancelled', 'confirmed'],
  confirmed: ['cancelled'],
  printing: ['cancelled'],
  printed: ['cancelled', 'shipping', 'complete'],
  shipping: ['cancelled', 'complete'],
};

const Printable = ({ models, uri, itar }) => {
  const model = models.find(model => model.uri === uri);
  let printable = true;

  if (model && model.analyses && !model.analyses.manifold) {
    printable = false;
  }

  if (model && printable) {
    return (
      <Label bsStyle="success">
        <FormattedMessage id="field.printable" defaultMessage="Printable" />
      </Label>
    );
  } else if ((model && !printable) || itar) {
    return (
      <Label bsStyle="warning">
        <FormattedMessage id="field.unknown" defaultMessage="Unknown" />
      </Label>
    );
  }
  return (
    <Label bsStyle="info">
      <FormattedMessage id="field.loading" defaultMessage="Loading" />
    </Label>
  );
};

Printable.defaultProps = { itar: false };

Printable.propTypes = {
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  uri: PropTypes.string.isRequired,
  itar: PropTypes.bool,
};

const LineItemFormComponent = ({
  handleFileChange,
  handleInputChange,
  lineItem,
  baseMaterial,
  baseMaterials,
  models,
  onSubmit,
  onDelete,
  providers,
  quantity,
  status,
  supportMaterial,
  supportMaterials,
  template,
  templates,
  thirdPartyProvider,
}) => {
  const currentModel = models.find(model => model.uri === lineItem.model);
  const statusOptions = statusOptionsMap[lineItem.status];
  return (
    <Form horizontal>
      <SaveDropdownButton onSubmit={onSubmit} onDelete={onDelete} />
      <FormRow id="field.printable" defaultMessage="Printable">
        <FormControl.Static>
          <Printable
            models={models}
            uri={lineItem.model}
            itar={lineItem.itar}
          />
        </FormControl.Static>
      </FormRow>

      <FormRow id="field.status" defaultMessage="Status">
        <FormControl
          name="status"
          componentClass="select"
          onChange={handleInputChange}
          value={status}
          required
        >
          <option value={status}>{ORDER_STATUS_MAP[status]}</option>
          {statusOptions ? (
            statusOptions.map(status => (
              <option key={status} value={status}>
                {ORDER_STATUS_MAP[status]}
              </option>
            ))
          ) : null}
        </FormControl>
      </FormRow>

      {lineItem.itar ? null : (
        <div>
          <FormRow id="field.model" defaultMessage="Model">
            <p>
              <a href={currentModel ? currentModel.content : null}>
                {currentModel ? currentModel.name : 'Loading Model...'}
              </a>
            </p>
          </FormRow>
          <FormRow id="field.replaceModel" defaultMessage="Replace Model">
            <FormControl
              name="model"
              type="file"
              accept=".stl"
              required
              onChange={handleFileChange}
            />
          </FormRow>
        </div>
      )}

      <FormRow id="field.quantity" defaultMessage="Quantity">
        <FormControl
          name="quantity"
          value={quantity}
          type="number"
          onChange={handleInputChange}
          required
        />
      </FormRow>

      <FormRow id="field.baseMaterial" defaultMessage="Base Material">
        <InputGroup>
          <FormControl
            name="baseMaterial"
            value={baseMaterial}
            componentClass="select"
            onChange={handleInputChange}
            required
          >
            {baseMaterials.map(material => (
              <option key={material.uri} value={material.uri}>
                {material.name}
              </option>
            ))}
          </FormControl>
          <InputGroup.Addon>
            {baseMaterial && (
              <ResourceLink
                href={`/#/records/materials/${extractUuid(baseMaterial)}`}
              />
            )}
          </InputGroup.Addon>
        </InputGroup>
      </FormRow>

      <FormRow id="field.supportMaterial" defaultMessage="Support Material">
        <InputGroup>
          <FormControl
            name="supportMaterial"
            value={supportMaterial}
            componentClass="select"
            onChange={handleInputChange}
          >
            <option value="">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {supportMaterials.map(material => (
              <option key={material.uri} value={material.uri}>
                {material.name}
              </option>
            ))}
          </FormControl>
          <InputGroup.Addon>
            {supportMaterial && (
              <ResourceLink
                href={`/#/records/materials/${extractUuid(supportMaterial)}`}
              />
            )}
          </InputGroup.Addon>
        </InputGroup>
      </FormRow>

      <FormRow id="field.template" defaultMessage="Select a template">
        <InputGroup>
          <FormControl
            name="template"
            value={template}
            componentClass="select"
            onChange={handleInputChange}
          >
            {templates.map(template => (
              <option key={template.uri} value={template.uri}>
                {template.name}
              </option>
            ))}
          </FormControl>
          <InputGroup.Addon>
            {template && (
              <ResourceLink
                href={`/#/records/template/${extractUuid(template)}`}
              />
            )}
          </InputGroup.Addon>
        </InputGroup>
      </FormRow>

      <FormRow
        id="field.thirdPartyProvider"
        defaultMessage="Third-Party Provider"
      >
        <InputGroup>
          <FormControl
            name="thirdPartyProvider"
            value={thirdPartyProvider}
            componentClass="select"
            onChange={handleInputChange}
          >
            <option value="">
              <FormattedMessage id="field.none" defaultMessage="None" />
            </option>
            {providers.map(provider => (
              <option key={provider.uri} value={provider.uri}>
                {provider.name}
              </option>
            ))}
          </FormControl>
          <InputGroup.Addon>
            {thirdPartyProvider && (
              <ResourceLink
                href={`/#/records/third-party-providers/${extractUuid(
                  thirdPartyProvider
                )}`}
              />
            )}
          </InputGroup.Addon>
        </InputGroup>
      </FormRow>
    </Form>
  );
};

LineItemFormComponent.defaultProps = {
  supportMaterial: null,
  template: null,
  thirdPartyProvider: null,
};

LineItemFormComponent.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  lineItem: PropTypes.object.isRequired,
  baseMaterial: PropTypes.string.isRequired,
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantity: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  supportMaterial: PropTypes.string,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  template: PropTypes.string,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  thirdPartyProvider: PropTypes.string,
};

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { lineItem } = this.props;

    this.state = {
      baseMaterial: lineItem.materials.base,
      supportMaterial: lineItem.materials.support,
      quantity: lineItem.quantity.toString(),
      status: lineItem.status,
      template: lineItem.template,
      thirdPartyProvider: lineItem.third_party_provider,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onDelete() {
    const { dispatch, lineItem, orderUuid } = this.props;
    await dispatch(Actions.Api.wyatt['line-item'].delete(lineItem.uuid));
    dispatch(Actions.Api.wyatt.order.get(orderUuid));
  }

  onSubmit(event) {
    event.preventDefault();
    const { dispatch, lineItem } = this.props;
    const {
      baseMaterial,
      model,
      quantity,
      status,
      supportMaterial,
      template,
      thirdPartyProvider,
    } = this.state;

    const payload = {
      bureau: lineItem.bureau,
      materials: {
        base: baseMaterial,
        support: supportMaterial,
      },
      quantity: parseInt(quantity, 10),
      status,
      template,
      third_party_provider: thirdPartyProvider,
    };

    if (!payload.materials.support) delete payload.materials.support;
    if (!payload.third_party_provider) delete payload.third_party_provider;
    if (status === lineItem.status) delete payload.status;

    if (!model) {
      dispatch(Actions.Api.wyatt['line-item'].put(lineItem.uuid, payload));
    } else {
      dispatch(
        Actions.Api.hoth.model.post({ name: model.name, type: 'stl' })
      ).then(args => {
        const { location, uploadLocation } = args.headers;
        payload.model = location;
        dispatch(Actions.Api.wyatt['line-item'].put(lineItem.uuid, payload));
        dispatch(Actions.UploadModel.upload(uploadLocation, model));
      });
    }
  }

  handleFileChange(event) {
    this.setState({ model: event.target.files[0] });
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  }

  render() {
    const {
      handleFileChange,
      handleInputChange,
      onDelete,
      onSubmit,
      props,
      state,
    } = this;

    return (
      <LineItemFormComponent
        {...props}
        {...state}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        onDelete={onDelete}
        onSubmit={onSubmit}
      />
    );
  }
}

LineItemForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lineItem: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const materials = Selectors.getMaterials(state);
  const baseMaterials = materials.filter(material => material.type === 'base');
  const supportMaterials = materials.filter(
    material => material.type === 'support'
  );
  const models = Selectors.getModels(state);
  const providers = Selectors.getThirdPartyProviders(state);
  const templates = Selectors.getTemplates(state);
  const orderUuid = state.routeUUID;

  return {
    baseMaterials,
    models,
    orderUuid,
    providers,
    supportMaterials,
    templates,
  };
};

export default connect(mapStateToProps)(LineItemForm);
