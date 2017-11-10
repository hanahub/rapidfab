import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import * as Selectors from 'rapidfab/selectors';

import NewOrder from 'rapidfab/components/records/order/new/NewOrder';
import FlashMessages from 'rapidfab/components/FlashMessages';

class NewOrderContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props.bureau);
  }

  componentDidUpdate(prevProps) {
    const { model, uploadModel } = this.props;
    const prevModel = prevProps.model;
    if (
      prevModel &&
      prevModel.status !== 'processed' &&
      model &&
      model.status === 'processed'
    ) {
      this.props.onSaveOrder(uploadModel.orderPayload);
    }
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { fetching } = this.props;

    return (
      <div>
        {fetching ? (
          <Loading />
        ) : (
          <div>
            <FlashMessages />
            <NewOrder {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

NewOrderContainer.propTypes = {
  bureau: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
  onInitialize: PropTypes.func.isRequired,
  onSaveOrder: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  uploadModel: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      const { uri } = bureau;
      dispatch(Actions.Api.wyatt.material.list({ bureau: uri }));
      dispatch(Actions.Api.wyatt['third-party'].list({ bureau: uri }));
      dispatch(Actions.Api.wyatt.shipping.list({ bureau: uri }));
      dispatch(Actions.Api.wyatt.template.list({ bureau: uri }));
      dispatch(Actions.Api.pao.users.list());
    },
    onSaveOrder: payload => {
      if (payload) {
        dispatch(Actions.UploadModel.storePayload(null));
        dispatch(Actions.Api.wyatt.order.post(payload)).then(args => {
          window.location.hash = `#/records/order/${extractUuid(
            args.headers.location
          )}`;
        });
      }
    },
    onUnmount: () => {
      dispatch(Actions.UploadModel.clearState());
    },
    onSubmit: payload => {
      const validatedPayload = Object.assign({}, payload);
      if (!!validatedPayload.materials.support === false)
        delete validatedPayload.materials.support;
      if (!!validatedPayload.shipping.name === false)
        delete validatedPayload.shipping.name;
      if (!!validatedPayload.shipping.address === false)
        delete validatedPayload.shipping.address;
      if (!!validatedPayload.shipping.tracking === false)
        delete validatedPayload.shipping.tracking;
      if (!!validatedPayload.third_party_provider === false)
        delete validatedPayload.third_party_provider;
      if (!!validatedPayload.post_processor_type === false)
        delete validatedPayload.post_processor_type;

      if (!validatedPayload.model) {
        dispatch(Actions.Api.wyatt.order.post(validatedPayload)).then(args => {
          window.location.hash = `#/records/order/${extractUuid(
            args.headers.location
          )}`;
        });
      } else {
        dispatch(
          Actions.Api.hoth.model.post({
            name: validatedPayload.name,
            type: 'stl',
          })
        ).then(args => {
          dispatch(
            Actions.UploadModel.upload(
              args.headers.uploadLocation,
              validatedPayload.model[0]
            )
          );
          validatedPayload.model = args.headers.location;
          dispatch(Actions.UploadModel.storePayload(validatedPayload));
        });
      }
    },
  };
}

function mapStateToProps(state) {
  const { material, order } = state.ui.wyatt;

  const fetching =
    material.list.fetching ||
    order.post.fetching ||
    state.ui.wyatt['third-party'].list.fetching ||
    state.ui.wyatt.template.list.fetching;

  const uploadModel = state.uploadModel;
  const processingModel = state.resources[uploadModel.modelUuid];

  return {
    bureau: Selectors.getBureau(state),
    materials: Selectors.getMaterials(state),
    model: processingModel,
    providers: Selectors.getThirdPartyProviders(state),
    shippings: Selectors.getShippings(state),
    templates: Selectors.getTemplates(state),
    fetching,
    uploadModel,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderContainer);
