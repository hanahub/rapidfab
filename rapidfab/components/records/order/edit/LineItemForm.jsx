import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Label,
} from 'react-bootstrap';

import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import { ORDER_STATUS_MAP } from 'rapidfab/mappings';
import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

import ModelInput from './ModelInput';
import SaveDropdownButton from './SaveDropdownButton';

const statusOptionsMap = {
  pending: ['cancelled', 'confirmed'],
  confirmed: ['cancelled'],
  printing: ['cancelled'],
  printed: ['cancelled', 'shipping', 'complete'],
  shipping: ['cancelled', 'complete'],
};

const FormRow = ({ id, defaultMessage, children }) =>
  <FormGroup>
    <Col xs={3}>
      <ControlLabel>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />:
      </ControlLabel>
    </Col>
    <Col xs={9}>
      {children}
    </Col>
  </FormGroup>;

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

const LineItemFormComponent = ({
  handleInputChange,
  lineItem,
  baseMaterial,
  baseMaterials,
  models,
  modelsIsFetching,
  materials,
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
          <option value={status}>
            {ORDER_STATUS_MAP[status]}
          </option>
          {statusOptions
            ? statusOptions.map(status =>
                <option key={status} value={status}>
                  {ORDER_STATUS_MAP[status]}
                </option>
              )
            : null}
        </FormControl>
      </FormRow>

      {lineItem.itar
        ? null
        : <FormRow id="field.model" defaultMessage="Model">
            <p>{ currentModel ? currentModel.name : 'Loading Model...'}</p>
          </FormRow>}

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
        <FormControl
          name="baseMaterial"
          value={baseMaterial}
          componentClass="select"
          onChange={handleInputChange}
          required
        >
          {baseMaterials.map(material =>
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          )}
        </FormControl>
      </FormRow>

      <FormRow id="field.supportMaterial" defaultMessage="Support Material">
        <FormControl
          name="supportMaterial"
          value={supportMaterial}
          componentClass="select"
          onChange={handleInputChange}
        >
          <option value="">
            <FormattedMessage id="field.none" defaultMessage="None" />
          </option>
          {supportMaterials.map(material =>
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          )}
        </FormControl>
      </FormRow>

      <FormRow id="field.template" defaultMessage="Select a template">
        <FormControl
          name="template"
          value={template}
          componentClass="select"
          onChange={handleInputChange}
        >
          {templates.map(template =>
            <option key={template.uri} value={template.uri}>
              {template.name}
            </option>
          )}
        </FormControl>
      </FormRow>

      <FormRow
        id="field.thirdPartyProvider"
        defaultMessage="Third-Party Provider"
      >
        <FormControl
          name="thirdPartyProvider"
          value={thirdPartyProvider}
          componentClass="select"
          onChange={handleInputChange}
        >
          <option value="">
            <FormattedMessage id="field.none" defaultMessage="None" />
          </option>
          {providers.map(provider =>
            <option key={provider.uri} value={provider.uri}>
              {provider.name}
            </option>
          )}
        </FormControl>
      </FormRow>
    </Form>
  );
};

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { lineItem } = this.props;

    this.state = {
      baseMaterial: lineItem.materials.base,
      supportMaterial: lineItem.materials.support,
      quantity: lineItem.quantity,
      status: lineItem.status,
      template: lineItem.template,
      thirdPartyProvider: lineItem['third_party_provider'],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  }

  async onDelete() {
    const { dispatch, lineItem, orderUuid } = this.props;
    await dispatch(Actions.Api.wyatt['line-item'].delete(lineItem.uuid));
    dispatch(Actions.Api.wyatt.order.get(orderUuid));
  }

  onSubmit(event) {
    event.preventDefault();

    const {
      baseMaterial,
      model,
      quantity,
      status,
      supportMaterial,
      template,
      thirdPartyProvider,
    } = this.state;

    const { dispatch, lineItem } = this.props;

    const payload = {
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

    dispatch(Actions.Api.wyatt['line-item'].put(lineItem.uuid, payload));
  }

  render() {
    const { handleInputChange, onDelete, onSubmit, props, state} = this;

    return (
      <LineItemFormComponent
        {...props}
        {...state}
        handleInputChange={handleInputChange}
        onDelete={onDelete}
        onSubmit={onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { model } = state.ui.hoth;

  const materials = Selectors.getMaterials(state);
  const baseMaterials = materials.filter(material => material.type === 'base');
  const supportMaterials = materials.filter(
    material => material.type === 'support'
  );
  const models = Selectors.getModels(state);
  const modelsIsFetching = model.list.fetching || model.get.fetching;
  const providers = Selectors.getThirdPartyProviders(state);
  const templates = Selectors.getTemplates(state);
  const orderUuid = state.routeUUID;

  return {
    baseMaterials,
    models,
    modelsIsFetching,
    orderUuid,
    providers,
    supportMaterials,
    templates,
  };
};

export default connect(mapStateToProps)(LineItemForm);
