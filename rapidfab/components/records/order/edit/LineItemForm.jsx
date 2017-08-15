import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
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
import SaveDropdownButton from './SaveDropdownButton';
import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

const fields = [
  'model',
  'materials.base',
  'materials.support',
  'template',
  'status',
  'uuid',
  'quantity',
  'third_party_provider',
];

const statusOptionsMap = {
  pending: ['cancelled', 'confirmed'],
  confirmed: ['cancelled'],
  printing: ['cancelled'],
  printed: ['cancelled', 'shipping', 'complete'],
  shipping: ['cancelled', 'complete'],
};

const FormRow = ({ id, defaultMessage, children }) => (
  <FormGroup>
    <Col xs={3}>
      <ControlLabel>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />:
      </ControlLabel>
    </Col>
    <Col xs={9}>
      {children}
    </Col>
  </FormGroup>
);

const ModelSelect = ({ models, modelsIsFetching, field }) => {
  if (modelsIsFetching) {
    return (
      <FormControl.Static>
        <FormattedMessage
          id="loading.model"
          defaultMessage="Loading models..."
        />
      </FormControl.Static>
    );
  }
  return (
    <FormControl componentClass="select" required {...field}>
      { models.map(model => (
        <option key={model.uri} value={model.uri}>
          {model.name}
        </option>
      ))
      }
    </FormControl>
  );
};

const Printable = ({ models, uri, itar }) => {
  const model = models.find(model => model.uri === uri);
  let printable = true;

  if ((model && model.analyses && !model.analyses.manifold)) {
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
  lineItem,
  models,
  modelsIsFetching,
  fields,
  materials,
  providers,
  handleSubmit,
  handleDelete,
  templates,
}) => {
  const initialStatus = fields.status.initialValue;
  const statusOptions = statusOptionsMap[initialStatus];
  return (
    <Form horizontal>
      <SaveDropdownButton onSubmit={handleSubmit} onDelete={handleDelete} />
      <FormRow id="field.printable" defaultMessage="Printable">
        <FormControl.Static>
          <Printable
            models={models}
            uri={fields.model.value}
            itar={lineItem.itar}
          />
        </FormControl.Static>
      </FormRow>

      <FormRow id="field.status" defaultMessage="Status">
        <FormControl componentClass="select" required {...fields.status}>
          <option value={initialStatus}>
            {ORDER_STATUS_MAP[initialStatus]}
          </option>
          { statusOptions ?
            statusOptions.map(status => (
              <option key={status} value={status}>
                {ORDER_STATUS_MAP[status]}
              </option>
            ))
            : null
          }
        </FormControl>
      </FormRow>

      { lineItem.itar ?
        null
        : <FormRow id="field.model" defaultMessage="Model">
          <ModelSelect
            models={models}
            modelsIsFetching={modelsIsFetching}
            field={fields.model}
          />
        </FormRow>
      }

      <FormRow id="field.quantity" defaultMessage="Quantity">
        <FormControl type="number" required {...fields.quantity} />
      </FormRow>

      <FormRow id="field.baseMaterial" defaultMessage="Base Material">
        <FormControl componentClass="select" required {...fields.materials.base}>
          <option value="" disabled>Select a Material</option>
          {_.map(_.filter(materials, { type: 'base' }), material => (
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          ))}
        </FormControl>
      </FormRow>

      <FormRow id="field.supportMaterial" defaultMessage="Support Material">
        <FormControl componentClass="select" {...fields.materials.support}>
          <option value="">
            <FormattedMessage id="field.none" defaultMessage="None" />
          </option>
          {_.map(_.filter(materials, { type: 'support' }), material => (
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          ))}
        </FormControl>
      </FormRow>

      <FormRow id="field.template" defaultMessage="Select a template">
        <FormControl componentClass="select" {...fields.template}>
          { templates.map(template => (
            <option key={template.uri} value={template.uri}>
              {template.name}
            </option>
          ))}
        </FormControl>
      </FormRow>

      <FormRow id="field.thirdPartyProvider" defaultMessage="Third-Party Provider">
        <FormControl componentClass="select" {...fields.third_party_provider}>
          <option value="">
            <FormattedMessage id="field.none" defaultMessage="None" />
          </option>
          { providers.map(provider => (
            <option key={provider.uri} value={provider.uri}>
              {provider.name}
            </option>
          ))}
        </FormControl>
      </FormRow>
    </Form>
  );
};

class LineItemForm extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { uuid, onDelete, orderUuid } = this.props;
    onDelete(uuid, orderUuid);
  }

  render() {
    const { props, handleDelete } = this;
    return <LineItemFormComponent {...props} handleDelete={handleDelete} />;
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (payload) => {
    if (!payload.materials.support) delete payload.materials.support;
    if (!payload.third_party_provider) delete payload.third_party_provider;

    dispatch(Actions.Api.wyatt['line-item'].put(payload.uuid, payload));
  },
  onDelete: (uuid, orderUuid) => {
    dispatch(Actions.Api.wyatt['line-item'].delete(uuid))
      .then(() => dispatch(Actions.Api.wyatt.order.get(orderUuid)));
  },
});

const mapStateToProps = (state, ownProps) => {
  const { model } = state.ui.hoth;
  const { lineItem } = ownProps;

  const materials = Selectors.getMaterials(state);
  const models = Selectors.getModels(state);
  const modelsIsFetching = model.list.fetching || model.get.fetching;
  const providers = Selectors.getThirdPartyProviders(state);
  const templates = Selectors.getTemplates(state);
  const uuid = extractUuid(lineItem.uri);
  const orderUuid = state.routeUUID;

  const initialValues = lineItem;

  return {
    initialValues,
    materials,
    models,
    modelsIsFetching,
    orderUuid,
    providers,
    templates,
    uuid,
  };
};

export default reduxForm({
  form: 'record.lineItem',
  fields,
}, mapStateToProps, mapDispatchToProps)(LineItemForm);
