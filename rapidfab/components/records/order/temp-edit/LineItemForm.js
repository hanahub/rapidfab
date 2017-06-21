import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

import SaveDropdownButton from './SaveDropdownButton';
import * as Selectors from 'rapidfab/selectors';

const fields = [
  'model',
  'materials.base',
  'materials.support',
  'template',
  'quantity',
];

const FormRow = ({id, defaultMessage, children}) => (
  <FormGroup>
    <Col xs={3}>
      <ControlLabel>
        <FormattedMessage id={id} defaultMessage={defaultMessage}/>:
      </ControlLabel>
    </Col>
    <Col xs={9}>
      {children}
    </Col>
  </FormGroup>
);

const ModelSelect = ({models, modelsIsFetching, field}) => {
  if(modelsIsFetching) {
    return (
      <FormControl.Static>
        <FormattedMessage id="loading.model" defaultMessage="Loading models..."/>
      </FormControl.Static>
    );
  } else {
    return (
      <FormControl componentClass="select" required {...field}>
        <option value="" disabled>Select a Model</option>
        {_.map(models, model => (<option key={model.uri} value={model.uri}>{model.name}</option>))}
      </FormControl>
    );
  }
}

const Printable = ({ models, uri }) => {
  let model = _.find(models, {uri})
  let printable = true

  if(model && !model.analyses.manifold) {
    printable = false
  }

  if(model) {
    if(printable) {
      return <Label bsStyle="success"><FormattedMessage id="field.printable" defaultMessage='Printable'/></Label>
    } else {
      return <Label bsStyle="warning"><FormattedMessage id="field.unknown" defaultMessage='Unknown'/></Label>
    }
  } else {
    return <Label bsStyle="info"><FormattedMessage id="field.loading" defaultMessage='Loading'/></Label>
  }
}

const LineItemFormComponent = ({
  models,
  modelsIsFetching,
  fields,
  materials,
  handleSubmit,
  handleDelete,
  templates,
}) => (
  <Form horizontal>
    <SaveDropdownButton onSubmit={handleSubmit} onDelete={handleDelete} />
    <FormRow id="field.printable" defaultMessage="Printable">
      <FormControl.Static>
        <Printable models={models} uri={fields.model.value} />
      </FormControl.Static>
    </FormRow>

    <FormRow id="field.model" defaultMessage="Model">
      <ModelSelect models={models} modelsIsFetching={modelsIsFetching} field={fields.model}/>
    </FormRow>

    <FormRow id="field.quantity" defaultMessage="Quantity">
      <FormControl type="number" required {...fields.quantity}/>
    </FormRow>

    <FormRow id="field.baseMaterial" defaultMessage="Base Material">
      <FormControl componentClass="select" required {...fields.materials.base}>
        <option value="" disabled>Select a Material</option>
        {_.map(_.filter(materials, {type: "base"}), material => (<option key={material.uri} value={material.uri}>{material.name}</option>))}
      </FormControl>
    </FormRow>

    <FormRow id="field.supportMaterial" defaultMessage="Support Material">
      <FormControl componentClass="select" {...fields.materials.support}>
        <option value="">None</option>
        {_.map(_.filter(materials, {type: "support"}), material => (<option key={material.uri} value={material.uri}>{material.name}</option>))}
      </FormControl>
    </FormRow>

    <FormRow id="field.template" defaultMessage="Select a template">
      <FormControl componentClass="select" {...fields.template}>
        <option key="placeholder" value="" selected>Select a Template</option>
        {_.map(templates, template => (
          <option key={template.uri} value={template.uri}>{template.name}</option>
        ))}
      </FormControl>
    </FormRow>
  </Form>
);

class LineItemForm extends Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { uuid, onDelete } = this.props;
    onDelete(uuid);
  }

  render() {
    const { props, handleDelete } = this;
    return <LineItemFormComponent {...props} handleDelete={handleDelete}/>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: payload => {
      // TODO: Pending Line Item API
      console.log(payload);
    },
    onDelete: uuid => {
      // TODO: Pending Line Item API
      console.log('delete', uuid);
    }
  }
}

const mapStateToProps = (state) => {
  const { model } = state.ui.hoth;
  const { uuid } = state.routeUUID;
  const initialValues = state.resources[uuid];
  const models = Selectors.getModels(state);
  const modelsIsFetching = model.list.fetching || model.get.fetching;
  const templates = Selectors.getTemplates(state);
  const materials = Selectors.getMaterials(state);

  return {
    initialValues,
    models,
    modelsIsFetching,
    templates,
    uuid,
    materials,
  }
}

export default reduxForm({
  form: 'record.lineItem',
  fields,
}, mapStateToProps, mapDispatchToProps)(LineItemForm)
