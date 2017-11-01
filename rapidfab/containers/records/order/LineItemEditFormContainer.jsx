import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

import LineItemEditForm from 'rapidfab/components/records/order/edit/LineItemEditForm';

class LineItemEditFormContainer extends Component {
  constructor(props) {
    super(props);
    const { lineItem } = this.props;

    this.state = {
      baseMaterial: lineItem.materials.base,
      notes: lineItem.notes,
      supportMaterial: lineItem.materials.support,
      quantity: lineItem.quantity.toString(),
      status: lineItem.status,
      template: lineItem.template,
      thirdPartyProvider: lineItem.third_party_provider,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModelDownload = this.handleModelDownload.bind(this);
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
      notes,
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
      notes,
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

  handleModelDownload() {
    const { dispatch, lineItem: { model: modelUri }, models } = this.props;
    const currentModel = models.find(model => model.uri === modelUri);
    dispatch(Actions.DownloadModel.fetchModel(modelUri)).then(response => {
      dispatch(
        Actions.DownloadModel.downloadContent(
          currentModel.name,
          response.json.content
        )
      );
    });
  }

  render() {
    const {
      handleFileChange,
      handleInputChange,
      handleModelDownload,
      onDelete,
      onSubmit,
      props,
      state,
    } = this;

    return (
      <LineItemEditForm
        {...props}
        {...state}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        handleModelDownload={handleModelDownload}
        onDelete={onDelete}
        onSubmit={onSubmit}
      />
    );
  }
}

LineItemEditFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lineItem: PropTypes.object.isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
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

export default connect(mapStateToProps)(LineItemEditFormContainer);
