import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Selectors from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';
import extractUuid from 'rapidfab/utils/extractUuid';

import LineItemEditForm from 'rapidfab/components/records/order/edit/LineItemEditForm';

class LineItemEditFormContainer extends Component {
  constructor(props) {
    super(props);
    const { lineItem } = this.props;

    this.state = {
      baseMaterial: lineItem.materials.base,
      layerThickness: lineItem.layer_thickness || '0.2',
      notes: lineItem.notes,
      modelUpload: null,
      modelUnits: lineItem.model_unit,
      supportMaterial: lineItem.materials.support,
      quantity: lineItem.quantity.toString(),
      status: lineItem.status,
      template: lineItem.template,
      thirdPartyProvider: lineItem.third_party_provider,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileRemove = this.handleFileRemove.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLayerThicknessBlur = this.handleLayerThicknessBlur.bind(this);
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
      layerThickness,
      modelUpload,
      modelUnits,
      notes,
      quantity,
      status,
      supportMaterial,
      template,
      thirdPartyProvider,
    } = this.state;

    const payload = {
      bureau: lineItem.bureau,
      layer_thickness: parseFloat(layerThickness, 10),
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

    if (modelUnits !== lineItem.model_unit) {
      dispatch(
        Actions.Api.hoth.model.put(extractUuid(lineItem.model), {
          unit: modelUnits === 'auto' ? null : modelUnits,
        })
      );
    }

    if (!modelUpload) {
      dispatch(Actions.Api.wyatt['line-item'].put(lineItem.uuid, payload));
    } else {
      dispatch(
        Actions.Api.hoth.model.post({ name: modelUpload.name, type: 'stl' })
      ).then(args => {
        const { location, uploadLocation } = args.headers;
        payload.model = location;
        dispatch(Actions.Api.wyatt['line-item'].put(lineItem.uuid, payload));
        dispatch(Actions.UploadModel.upload(uploadLocation, modelUpload));
      });
    }
  }

  handleFileChange(event) {
    this.setState({ modelUpload: event.target.files[0], modelUnits: 'auto' });
  }

  handleFileRemove() {
    this.setState({
      modelUpload: null,
      modelUnits: this.props.lineItem.model_unit,
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  }

  handleLayerThicknessBlur(event) {
    const { value } = event.target;
    const number = parseFloat(value, 10);
    if (number > 1) {
      this.setState({ layerThickness: '1' });
    } else if (number < 0.02) {
      this.setState({ layerThickness: '0.02' });
    }
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
      handleFileRemove,
      handleInputChange,
      handleLayerThicknessBlur,
      handleModelDownload,
      onDelete,
      onSubmit,
      props,
      state,
    } = this;

    const baseMaterialColor = this.props.baseMaterials.find(
      material => material.uri === this.state.baseMaterial
    ).color;
    const supportMaterial = this.props.supportMaterials.find(
      material => material.uri === this.state.supportMaterial
    );
    const supportMaterialColor = supportMaterial ? supportMaterial.color : null;

    return (
      <LineItemEditForm
        {...props}
        {...state}
        baseMaterialColor={baseMaterialColor}
        handleFileChange={handleFileChange}
        handleFileRemove={handleFileRemove}
        handleInputChange={handleInputChange}
        handleLayerThicknessBlur={handleLayerThicknessBlur}
        handleModelDownload={handleModelDownload}
        onDelete={onDelete}
        onSubmit={onSubmit}
        supportMaterialColor={supportMaterialColor}
      />
    );
  }
}

LineItemEditFormContainer.propTypes = {
  baseMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  lineItem: PropTypes.shape({ model_unit: PropTypes.string }).isRequired,
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  supportMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  const {
    base: baseMaterials,
    support: supportMaterials,
  } = Selectors.getBaseAndSupportMaterials(state);
  const isRestricted = Selectors.isCurrentUserRestricted(state);
  const models = Selectors.getModels(state);
  const providers = Selectors.getThirdPartyProviders(state);
  const templates = Selectors.getTemplates(state);
  const orderUuid = state.routeUUID;

  return {
    baseMaterials,
    isRestricted,
    models,
    orderUuid,
    providers,
    supportMaterials,
    templates,
  };
};

export default connect(mapStateToProps)(LineItemEditFormContainer);
