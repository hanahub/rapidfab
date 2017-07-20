import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Actions from 'rapidfab/actions';
import Config from 'rapidfab/config';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';
import * as Selectors from 'rapidfab/selectors';

import NewOrder from 'rapidfab/components/records/order/new/NewOrder';
import Gatekeeper from 'rapidfab/components/gatekeeper.js';
import FlashMessages from 'rapidfab/components/FlashMessages.js';

class NewOrderContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props.bureau.group)
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  componentDidUpdate(prevProps, prevState) {
    const { model, uploadModel } = this.props
    const prevModel = prevProps.model
    if(prevModel && prevModel.status !== "processed" && model && model.status === "processed") {
      this.props.onSaveOrder(uploadModel.orderPayload)
    }
  }

  render() {
    const { fetching } = this.props;

    return (
      <Gatekeeper loading={fetching}>
        <div>
          <FlashMessages />
          <NewOrder {...this.props}/>
        </div>
      </Gatekeeper>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onInitialize: (bureauGroup) => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt['third-party'].list())
      dispatch(Actions.Api.wyatt.shipping.list())
      dispatch(Actions.Api.wyatt.template.list())
      if(bureauGroup){
        dispatch(Actions.Api.pao.users.list({ 'group': bureauGroup }))
      }
    },
    onSaveOrder: payload => {
      if(payload) {
        dispatch(Actions.UploadModel.storePayload(null))
        dispatch(Actions.Api.wyatt.order.post(payload)).then(args => {
          window.location.hash = `#/records/order/${extractUuid(args.headers.location)}`;
        })
      }
    },
    onUnmount: () => {
      dispatch(Actions.UploadModel.clearState())
    },
    onSubmit: payload => {
      if (false === !!payload.materials.support) delete payload.materials.support
      if (false === !!payload.shipping.name) delete payload.shipping.name
      if (false === !!payload.shipping.address) delete payload.shipping.address
      if (false === !!payload.shipping.tracking) delete payload.shipping.tracking
      if (false === !!payload.third_party_provider) delete payload.third_party_provider
      if (false === !!payload.post_processor_type) delete payload.post_processor_type

      if (!payload.model) {
        dispatch(Actions.Api.wyatt.order.post(payload)).then(args => {
          window.location.hash = `#/records/order/${extractUuid(args.headers.location)}`;
        })
      } else {
        dispatch(Actions.Api.hoth.model.post({
          name: payload.name,
          type: "stl",
        })).then(args => {
          dispatch(Actions.UploadModel.upload(args.headers.uploadLocation, payload.model[0]))
          payload.model = args.headers.location
          dispatch(Actions.UploadModel.storePayload(payload))
        })
      }
    }
  }
}

function mapStateToProps(state, props) {
  const {
    material,
    model,
    order,
  } = state.ui.wyatt;

  const fetching =
    material.list.fetching ||
    order.post.fetching ||
    state.ui.wyatt['third-party'].list.fetching ||
    state.ui.wyatt.template.list.fetching

  const uploadModel = state.uploadModel
  const processingModel = state.resources[uploadModel.modelUuid]

  return {
    bureau             : Selectors.getBureau(state),
    materials          : Selectors.getMaterials(state),
    model              : processingModel,
    providers          : Selectors.getThirdPartyProviders(state),
    shippings          : Selectors.getShippings(state),
    templates          : Selectors.getTemplates(state),
    fetching,
    uploadModel,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderContainer)
