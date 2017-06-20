import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'
import * as Selectors from 'rapidfab/selectors';
import _ from 'lodash';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';
import {
  FormattedCost,
  FormattedDate,
  FormattedDuration,
  FormattedMessage,
  FormattedVolume
} from 'rapidfab/i18n';

import {
  FormControlTextArea,
  FormControlTextCareful
} from 'rapidfab/components/formTools';

const fields = [
  'estimates',
  'model',
  'materials',
  'template',
  'quantity',
];

const Header = ( prints ) => {
  const complete = (_.reduce(prints, (total, print) => print.status == 'complete' ? total + 1 : total, 0)).toString();
  const total = (!!prints ? prints.length : 0).toString();
  return (
    <FormattedMessage id="record.printCompleteCount" defaultMessage={`Process Steps - {complete} / {total} complete`} values={{complete: complete, total: total}}/>
  )
}

const PrintItem = ({ print }) => {
  const statusMapping = {
    created           : (<FormattedMessage id="status.created" defaultMessage="Created"/>),
    calculating       : (<FormattedMessage id="status.calculating" defaultMessage="Calculating"/>),
    calculated        : (<FormattedMessage id="status.calculated" defaultMessage="Calculated"/>),
    queued            : (<FormattedMessage id="status.queued" defaultMessage="Queued"/>),
    "in-progress"     : (<FormattedMessage id="status.in_progress" defaultMessage="In Progress"/>),
    complete          : (<FormattedMessage id="status.complete" defaultMessage="Complete"/>),
    error             : (<FormattedMessage id="status.error" defaultMessage="Error"/>),
  };

  return (
    <BS.ListGroupItem>
      <BS.Row>
        <BS.Col xs={6}>
          {print.id}
        </BS.Col>
        <BS.Col xs={6}>
          {statusMapping[print.status]}
        </BS.Col>
      </BS.Row>
    </BS.ListGroupItem>
  );
}

const Prints = ({ prints }) => (
  <BS.ListGroup fill>
    <BS.ListGroupItem style={{ borderBottomWidth: 2 }} key="header">
      <BS.Row>
        <BS.Col xs={6}>
          <b><FormattedMessage id="field.id" defaultMessage="ID"/></b>
        </BS.Col>
        <BS.Col xs={6}>
          <b><FormattedMessage id="field.status" defaultMessage="Status"/></b>
        </BS.Col>
      </BS.Row>
    </BS.ListGroupItem>
    <div style={{overflowY: 'scroll', height: 215}}>
      { prints.map( print => <PrintItem key={print.id} print={print} />)}
    </div>
  </BS.ListGroup>
);

const Estimates = ({ estimates, currency }) => (
  <BS.ListGroup fill>
    <BS.ListGroupItem header={<FormattedMessage id="field.estimatedPrintTime" defaultMessage='Estimated Print Time'/>}>
      {estimates.print_time.value ?
        <FormattedDuration value={estimates.print_time.value}/> :
          (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
      }
    </BS.ListGroupItem>
    <BS.ListGroupItem header={<FormattedMessage id="field.estimatedMaterialUsed" defaultMessage='Estimated Material Used'/>}>
      {estimates.materials.base.value ?
        <FormattedVolume value={estimates.materials.base.value}/> :
          (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
      }
    </BS.ListGroupItem>
    <BS.ListGroupItem header={<FormattedMessage id="field.estimatedSupportUsed" defaultMessage='Estimated Support Used'/>}>
      {estimates.materials.support.value ?
        <FormattedVolume value={estimates.materials.support.value}/> :
          (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
      }
    </BS.ListGroupItem>
    <BS.ListGroupItem header={<FormattedMessage id="field.estimatedCost" defaultMessage='Estimated Cost'/>}>
      {estimates.cost.amount.value ?
        <FormattedCost currency={currency.value} value={estimates.cost.amount.value} /> :
          (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
      }
    </BS.ListGroupItem>
    <BS.ListGroupItem header={<FormattedMessage id="field.estimatedShippingCost" defaultMessage='Estimated Shipping Cost'/>}>
      {estimates.cost.shipping_amount.value ?
        <FormattedCost currency={currency.value} value={estimates.cost.shipping_amount.value} /> :
          (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
      }
    </BS.ListGroupItem>
    <BS.ListGroupItem header={<FormattedMessage id="field.estimatedTotalCost" defaultMessage='Estimated Total Cost'/>}>
      {estimates.cost.amount.value + estimates.cost.shipping_amount.value ?
        <FormattedCost currency={currency.value} value={estimates.cost.amount.value + estimates.cost.shipping_amount.value} /> :
          (<em><FormattedMessage id="notAvailable" defaultMessage='N/A'/></em>)
      }
    </BS.ListGroupItem>
  </BS.ListGroup>
);

const Thumbnail = ({src}) => {
  if(!src) {
    return (
      <div>
        <Fa name="spinner" spin/>
        <span> </span>
        <FormattedMessage id="loading.thumbnail" defaultMessage="Loading Thumbnail..."/>
      </div>
    );
  } else {
    return (<BS.Thumbnail src={src} />);
  }
}

const FormRow = ({id, defaultMessage, children}) => (
  <BS.FormGroup>
    <BS.Col xs={3}>
      <BS.ControlLabel><FormattedMessage id={id} defaultMessage={defaultMessage}/>:</BS.ControlLabel> </BS.Col>
    <BS.Col xs={9}>
      {children}
    </BS.Col>
  </BS.FormGroup>
)

const ModelSelect = ({models, modelsIsFetching, field}) => {
  if(modelsIsFetching) {
    return (
      <BS.FormControl.Static>
        <FormattedMessage id="loading.model" defaultMessage="Loading models..."/>
      </BS.FormControl.Static>
    );
  } else {
    return (
      <BS.FormControl componentClass="select" required {...field}>
        <option value="" disabled>Select a Model</option>
        {_.map(models, model => (<option key={model.uri} value={model.uri}>{model.name}</option>))}
      </BS.FormControl>
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
      return <BS.Label bsStyle="success"><FormattedMessage id="field.printable" defaultMessage='Printable'/></BS.Label>
    } else {
      return <BS.Label bsStyle="warning"><FormattedMessage id="field.unknown" defaultMessage='Unknown'/></BS.Label>
    }
  } else {
    return <BS.Label bsStyle="info"><FormattedMessage id="field.loading" defaultMessage='Loading'/></BS.Label>
  }
}

const LineItemForm = ({
  models,
  modelsIsFetching,
  fields,
  materials,
  templates,
}) => (
  <BS.Col>
    <FormRow id="field.printable" defaultMessage="Printable">
      <BS.FormControl.Static>
        <Printable models={models} uri={fields.model.value}/>
      </BS.FormControl.Static>
    </FormRow>

    <FormRow id="field.model" defaultMessage="Model">
      <ModelSelect models={models} modelsIsFetching={modelsIsFetching} field={fields.model}/>
    </FormRow>

    <FormRow id="field.quantity" defaultMessage="Quantity">
      <BS.FormControl type="number" required {...fields.quantity}/>
    </FormRow>

    <FormRow id="field.baseMaterial" defaultMessage="Base Material">
      <BS.FormControl componentClass="select" required {...fields.materials.base}>
        <option value="" disabled>Select a Material</option>
        {_.map(_.filter(materials, {type: "base"}), material => (<option key={material.uri} value={material.uri}>{material.name}</option>))}
      </BS.FormControl>
    </FormRow>

    <FormRow id="field.supportMaterial" defaultMessage="Support Material">
      <BS.FormControl componentClass="select" {...fields.materials.support}>
        <option value="">None</option>
        {_.map(_.filter(materials, {type: "support"}), material => (<option key={material.uri} value={material.uri}>{material.name}</option>))}
      </BS.FormControl>
    </FormRow>

    <FormRow id="field.template" defaultMessage="Select a template">
      <BS.FormControl componentClass="select" {...fields.template}>
        <option key="placeholder" value="" selected>Select a Template</option>
        {_.map(templates, template => (
          <option key={template.uri} value={template.uri}>{template.name}</option>
        ))}
      </BS.FormControl>
    </FormRow>
  </BS.Col>
);

const LineItem = ({
  currency,
  estimates,
  fields,
  materials,
  models,
  modelsIsFetching,
  prints,
  snapshot,
  templates,
}) => (
  <BS.Panel header="Line Item">

    <BS.Col xs={10} xsOffset={1} sm={4} smOffset={0} lg={2} lgOffset={1}>
      <Thumbnail src={snapshot}/>
    </BS.Col>

    <BS.Col xs={12} sm={8} lgOffset={1}>

      <BS.Accordion>
        <BS.Panel bsStyle="primary" header="Summary" eventKey="1" expanded="true">
          <LineItemForm fields={fields} templates={templates} models={models} materials={materials} modelsIsFetching={modelsIsFetching}/>
        </BS.Panel>
        <BS.Panel bsStyle="primary" header="Estimates" eventKey="2">
          <Estimates estimates={estimates} currency={currency}/>
        </BS.Panel>
        <BS.Panel
          header="Process Steps"
          // header={Header(prints)}
          bsStyle="primary" eventKey="3">
          <Prints prints={prints} />
        </BS.Panel>
      </BS.Accordion>

    </BS.Col>
  </BS.Panel>
);

function getSnapshotFromOrder(order, models) {
  if(!order || models.length === 0) return ''
  const model = models.filter(model => model.uri === order.model)
  return (model && model.length) ? model[0].snapshot_content : ''
}

const mapStateToProps = (state) => {
  const { order } = state.ui.wyatt;
  const { model } = state.ui.hoth;

  const orderResource = state.resources[state.routeUUID.uuid];
  const { currency, estimates } = orderResource;
  const models = Selectors.getModels(state);
  const modelsIsFetching = model.list.fetching || model.get.fetching;
  const prints = Selectors.getPrintsForOrder(state, orderResource);
  const snapshot = getSnapshotFromOrder(orderResource, models);
  const templates = Selectors.getTemplates(state);
  const materials = Selectors.getMaterials(state);

  return {
    initialValues: orderResource,
    currency,
    estimates,
    models,
    modelsIsFetching,
    materials,
    prints,
    snapshot,
    templates,
  }
}

export default reduxForm({
  form: 'record.lineItem',
  fields,
},mapStateToProps)(LineItem)
