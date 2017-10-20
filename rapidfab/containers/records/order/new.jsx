import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import * as Selectors from 'rapidfab/selectors';

import NewOrder from 'rapidfab/components/records/order/new/NewOrder';
import Gatekeeper from 'rapidfab/components/gatekeeper';
import FlashMessages from 'rapidfab/components/FlashMessages';

class NewOrderContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props.bureau);
  }

  componentWillUnmount() {
    this.props.onUnmount();
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

  render() {
    const { fetching } = this.props;

    return (
      <Gatekeeper loading={fetching}>
        <div>
          <FlashMessages />
          <NewOrder {...this.props} />
        </div>
      </Gatekeeper>
    );
  }
}

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
      if (!!payload.materials.support === false)
        delete payload.materials.support;
      if (!!payload.shipping.name === false) delete payload.shipping.name;
      if (!!payload.shipping.address === false) delete payload.shipping.address;
      if (!!payload.shipping.tracking === false)
        delete payload.shipping.tracking;
      if (!!payload.third_party_provider === false)
        delete payload.third_party_provider;
      if (!!payload.post_processor_type === false)
        delete payload.post_processor_type;

      if (!payload.model) {
        dispatch(Actions.Api.wyatt.order.post(payload)).then(args => {
          window.location.hash = `#/records/order/${extractUuid(
            args.headers.location
          )}`;
        });
      } else {
        dispatch(
          Actions.Api.hoth.model.post({
            name: payload.name,
            type: 'stl',
          })
        ).then(args => {
          dispatch(
            Actions.UploadModel.upload(
              args.headers.uploadLocation,
              payload.model[0]
            )
          );
          payload.model = args.headers.location;
          dispatch(Actions.UploadModel.storePayload(payload));
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
