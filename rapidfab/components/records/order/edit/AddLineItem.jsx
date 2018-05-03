import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {
  Button,
  ButtonToolbar,
  Checkbox,
  ControlLabel,
  Form,
  FormControl,
  Panel,
} from 'react-bootstrap';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import Feature from 'rapidfab/components/Feature';
import ModelInput from './ModelInput';

const PanelHeader = () => (
  <FormattedMessage id="record.lineItem.add" defaultMessage="Add Line Item" />
);

const styles = { hidden: { display: 'none' } };

const AddLineItemPresentation = ({
  baseMaterial,
  baseMaterials,
  handleFileChange,
  handleInputChange,
  isUserRestricted,
  itar,
  onSubmit,
  modelName,
  modelUnits,
  providers,
  quantity,
  submitting,
  supportMaterial,
  supportMaterials,
  template,
  templates,
  thirdPartyProvider,
}) => (
  <Panel header={<PanelHeader />}>
    <Form onSubmit={onSubmit}>
      <Feature featureName={'itar'}>
        <div>
          <ControlLabel>
            <FormattedMessage id="record.itar" defaultMessage="ITAR Model" />
          </ControlLabel>
          <Checkbox name="itar" checked={itar} onChange={handleInputChange} />
        </div>
      </Feature>
      {!itar && (
        <div>
          <ModelInput handleFileChange={handleFileChange} name={modelName} />
          <div style={isUserRestricted ? styles.hidden : null}>
            <ControlLabel>
              <FormattedMessage id="modelUnits" defaultMessage="Model Units" />
            </ControlLabel>
            <FormControl
              name="modelUnits"
              value={modelUnits}
              componentClass="select"
              onChange={handleInputChange}
              required
            >
              <option value="auto">
                <FormattedMessage id="automatic" defaultMessage="Automatic" />
              </option>
              <option value="in">
                <FormattedMessage id="inches" defaultMessage="Inches" />
              </option>
              <option value="mm">
                <FormattedMessage
                  id="millimeters"
                  defaultMessage="Millimeters"
                />
              </option>
            </FormControl>
          </div>
        </div>
      )}
      <div style={isUserRestricted ? styles.hidden : null}>
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
          {baseMaterials.map(material => (
            <option key={material.uri} value={material.uri}>
              {material.name}
            </option>
          ))}
        </FormControl>
      </div>
      {!isUserRestricted && (
        <div>
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
            {supportMaterials.map(material => (
              <option key={material.uri} value={material.uri}>
                {material.name}
              </option>
            ))}
          </FormControl>
        </div>
      )}
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
      <div style={isUserRestricted ? styles.hidden : null}>
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
          {templates.map(templateOption => (
            <option key={templateOption.uri} value={templateOption.uri}>
              {templateOption.name}
            </option>
          ))}
        </FormControl>
      </div>
      {!isUserRestricted && (
        <div>
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
            {providers.map(provider => (
              <option key={provider.uri} value={provider.uri}>
                {provider.name}
              </option>
            ))}
          </FormControl>
        </div>
      )}
      <ButtonToolbar className="clearfix">
        <Button
          disabled={submitting}
          type="submit"
          bsStyle="success"
          className="pull-right"
          style={{ marginTop: '2rem' }}
        >
          {' '}
          {submitting ? (
            <FontAwesome name="spinner" spin />
          ) : (
            <FormattedMessage
              id="record.lineItem.add"
              defaultMessage="Add Line Item"
            />
          )}
        </Button>
      </ButtonToolbar>
    </Form>
  </Panel>
);

AddLineItemPresentation.propTypes = {
  baseMaterial: PropTypes.string.isRequired,
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isUserRestricted: PropTypes.bool.isRequired,
  itar: PropTypes.bool.isRequired,
  modelName: PropTypes.string.isRequired,
  modelUnits: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantity: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired,
  supportMaterial: PropTypes.string.isRequired,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  template: PropTypes.string.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  thirdPartyProvider: PropTypes.string.isRequired,
};

class AddLineItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseMaterial: '',
      itar: false,
      modelUnits: '',
      model: null,
      quantity: '',
      submitting: false,
      supportMaterial: '',
      template: '',
      thirdPartyProvider: '',
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.resetForm();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.baseMaterial && nextProps.baseMaterials.length) {
      this.setState({ baseMaterial: nextProps.baseMaterials[0].uri });
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const {
      baseMaterial,
      itar,
      model,
      modelUnits,
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
      quantity: parseInt(quantity, 10),
      template,
      third_party_provider: thirdPartyProvider,
    };
    if (!payload.materials.support) delete payload.materials.support;
    if (!payload.third_party_provider) delete payload.third_party_provider;

    this.setState({ submitting: true });

    if (itar) {
      dispatch(Actions.Api.wyatt['line-item'].post(payload))
        .then(response => {
          const newLineItem = response.headers.location;
          const orderPayload = {
            line_items: [...order.line_items, newLineItem],
          };
          const uuid = extractUuid(order.uri);

          return dispatch(Actions.Api.wyatt.order.put(uuid, orderPayload));
        })
        .then(() => {
          this.setState({ submitting: false });
        })
        .catch(() => {
          this.setState({ submitting: false });
        });
    } else {
      dispatch(
        Actions.Api.hoth.model.post({
          name: model.name,
          unit: modelUnits === 'auto' ? null : modelUnits,
          type: 'stl',
        })
      )
        .then(args => {
          const { location, uploadLocation } = args.headers;
          payload.model = location;
          // Post model to hoth
          return dispatch(Actions.UploadModel.upload(uploadLocation, model));
        })
        .then(() => dispatch(Actions.Api.wyatt['line-item'].post(payload)))
        .then(response => {
          this.resetForm();
          const newLineItem = response.headers.location;
          const orderPayload = {
            line_items: [...order.line_items, newLineItem],
          };
          const uuid = extractUuid(order.uri);
          dispatch(Actions.Api.wyatt['line-item'].get(newLineItem));
          return dispatch(Actions.Api.wyatt.order.put(uuid, orderPayload));
        })
        .then(() => {
          this.setState({ submitting: false });
        })
        .catch(() => {
          this.setState({ submitting: false });
        });
    }
  }

  resetForm() {
    const { baseMaterials, templates } = this.props;
    this.setState({
      baseMaterial: baseMaterials[0] ? baseMaterials.uri : null,
      itar: false,
      modelUnits: 'auto',
      model: null,
      quantity: '1',
      supportMaterial: '',
      template: templates[0] ? templates[0].uri : null,
      thirdPartyProvider: '',
    });
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
        modelName={this.state.model ? this.state.model.name : null}
        onSubmit={onSubmit}
      />
    );
  }
}

AddLineItem.propTypes = {
  baseMaterial: PropTypes.string.isRequired,
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  bureau: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  itar: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  order: PropTypes.shape({}).isRequired,
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantity: PropTypes.string.isRequired,
  supportMaterial: PropTypes.string.isRequired,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  template: PropTypes.string.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  thirdPartyProvider: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const bureau = Selectors.getBureau(state);
  const {
    base: baseMaterials,
    support: supportMaterials,
  } = Selectors.getBaseAndSupportMaterials(state);
  const providers = Selectors.getThirdPartyProviders(state);
  const templates = Selectors.getTemplatesAlphabetized(state);
  const isUserRestricted = Selectors.isCurrentUserRestricted(state);
  const order = state.resources[state.routeUUID];
  const submitting = state.ui.wyatt['line-item'].post.fetching;

  return {
    baseMaterials,
    bureau,
    isUserRestricted,
    order,
    providers,
    submitting,
    supportMaterials,
    templates,
  };
};

export default connect(mapStateToProps)(AddLineItem);
