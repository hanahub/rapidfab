import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Panel,
} from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import Feature from 'rapidfab/components/Feature';
import ModelInput from './ModelInput';

const PanelHeader = () =>
  <FormattedMessage id="record.lineItem.add" defaultMessage="Add Line Item" />;

const AddLineItemPresentation = ({
  baseMaterial,
  baseMaterials,
  handleFileChange,
  handleInputChange,
  itar,
  onSubmit,
  providers,
  quantity,
  supportMaterial,
  supportMaterials,
  template,
  templates,
  thirdPartyProvider,
}) =>
  <Panel header={<PanelHeader />}>
    <Form onSubmit={onSubmit}>
      <Feature featureName={'itar'}>
        <Col lg={1}>
          <ControlLabel>
            <FormattedMessage id="record.itar" defaultMessage="ITAR Model" />
          </ControlLabel>
          <Checkbox name="itar" checked={itar} onChange={handleInputChange} />
        </Col>
      </Feature>
      {itar ? null : <ModelInput handleFileChange={handleFileChange} />}
      <Col lg={2}>
        <ControlLabel>
          <FormattedMessage id="field.material" defaultMessage="Material" />:
        </ControlLabel>
        <FormControl
          name="baseMaterial"
          componentClass="select"
          onChange={handleInputChange}
          value={baseMaterial}
          required
        >
          {baseMaterials.map(material =>
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          )}
        </FormControl>
      </Col>
      <Col lg={2}>
        <ControlLabel>
          <FormattedMessage
            id="field.supportMaterial"
            defaultMessage="Support Material"
          />:
        </ControlLabel>
        <FormControl
          name="supportMaterial"
          componentClass="select"
          onChange={handleInputChange}
          value={supportMaterial}
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
      </Col>
      <Col lg={1}>
        <ControlLabel>
          <FormattedMessage id="field.quantity" defaultMessage="Quantity" />:
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
          <FormattedMessage id="field.template" defaultMessage="Template" />:
        </ControlLabel>
        <FormControl
          name="template"
          componentClass="select"
          required
          onChange={handleInputChange}
          value={template}
        >
          {templates.map(template =>
            <option key={template.uri} value={template.uri}>
              {template.name}
            </option>
          )}
        </FormControl>
      </Col>
      <Col lg={2}>
        <ControlLabel>
          <FormattedMessage
            id="field.thirdPartyProvider"
            defaultMessage="Third-Party Provider"
          />
        </ControlLabel>
        <FormControl
          name="thirdPartyProvider"
          componentClass="select"
          onChange={handleInputChange}
          value={thirdPartyProvider}
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
      </Col>
      {/*
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
      */}
      <Col xs={12}>
        <ButtonToolbar className="clearfix">
          <Button
            type="submit"
            bsStyle="success"
            className="pull-right"
            style={{ marginTop: '2rem' }}
          >
            {' '}Add
          </Button>
        </ButtonToolbar>
      </Col>
    </Form>
  </Panel>;

class AddLineItem extends Component {
  constructor(props) {
    super(props);

    const { baseMaterials, templates } = props;

    const baseMaterial = baseMaterials[0] ? baseMaterials[0].uri : null;
    const itar = false;
    const supportMaterial = '';
    const template = templates[0] ? templates[0].uri : null;
    const thirdPartyProvider = '';

    this.state = {
      baseMaterial,
      itar,
      supportMaterial,
      template,
      thirdPartyProvider,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(event) {
    event.preventDefault();

    const {
      baseMaterial,
      itar,
      model,
      quantity,
      supportMaterial,
      template,
      thirdPartyProvider,
    } = this.state;

    const { bureau, dispatch, order } = this.props;

    const payload = {
      bureau: bureau.uri,
      itar,
      materials: {
        base: baseMaterial,
        support: supportMaterial,
      },
      // notes: PENDING api implementation
      quantity: parseInt(quantity),
      template,
      third_party_provider: thirdPartyProvider,
    };
    if (!payload.materials.support) delete payload.materials.support;
    if (!payload.third_party_provider) delete payload.third_party_provider;

    if (itar) {
      dispatch(Actions.Api.wyatt['line-item'].post(payload)).then(response => {
        const newLineItem = response.headers.location;
        const payload = {
          line_items: [...order.line_items, newLineItem],
        };
        const uuid = extractUuid(order.uri);

        return dispatch(Actions.Api.wyatt.order.put(uuid, payload));
      });
    } else {
      dispatch(
        Actions.Api.hoth.model.post({ name: model.name, type: 'stl' })
      ).then(args => {
        const { location, uploadLocation } = args.headers;

        // Post model to hoth
        dispatch(Actions.UploadModel.upload(uploadLocation, model));

        // Post line-item to wyatt
        payload.model = location;
        dispatch(
          Actions.Api.wyatt['line-item'].post(payload)
        ).then(response => {
          const newLineItem = response.headers.location;
          const payload = {
            line_items: [...order.line_items, newLineItem],
          };
          const uuid = extractUuid(order.uri);

          return dispatch(Actions.Api.wyatt.order.put(uuid, payload));
        });
      });
    }
  }

  render() {
    const {
      props,
      state,
      handleFileChange,
      handleInputChange,
      onSubmit,
    } = this;
    return (
      <AddLineItemPresentation
        {...props}
        {...state}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    );
  }
}

const mapStateToProps = state => {
  const bureau = Selectors.getBureau(state);
  const materials = Selectors.getMaterials(state);
  const providers = Selectors.getThirdPartyProviders(state);
  const templates = Selectors.getTemplates(state);
  const order = state.resources[state.routeUUID];

  const baseMaterials = materials.filter(material => material.type === 'base');
  const supportMaterials = materials.filter(
    material => material.type === 'support'
  );

  return {
    baseMaterials,
    bureau,
    order,
    providers,
    supportMaterials,
    templates,
  };
};

export default connect(mapStateToProps)(AddLineItem);
