import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Actions from "rapidfab/actions"
import * as Selectors from 'rapidfab/selectors'
import { extractUuid } from 'rapidfab/reducers/makeApiReducers'

import Uploading from 'rapidfab/components/Uploading';
import EditOrder from 'rapidfab/components/records/order/temp-edit/EditOrder';
import GateKeeper from 'rapidfab/components/gatekeeper';

class OrderContainer extends Component {

  componentWillMount() {
    const { props, props: { dispatch, route: { uuid }}} = this;

    // Set route UUID in state
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));

    // Fetch order and related resources
    dispatch(Actions.Api.wyatt.order.get(uuid))
    dispatch(Actions.Api.wyatt['line-item'].list({'order': props.order.uri}));
    dispatch(Actions.Api.wyatt.print.list({'order': props.order.uri}));
    dispatch(Actions.Api.wyatt.run.list());

    // Fetch resource options for input selections
    dispatch(Actions.Api.hoth.model.list());
    dispatch(Actions.Api.wyatt.material.list());
    dispatch(Actions.Api.wyatt['third-party'].list());
    dispatch(Actions.Api.wyatt['post-processor-type'].list());
    dispatch(Actions.Api.wyatt.template.list());
    dispatch(Actions.Api.wyatt.shipping.list());
  }

  componentDidUpdate(prevProps, prevState) {
    const { uploadingModel, uploadModel } = this.props;
    const prevModel = prevProps.uploadingModel;

    const wasUploading = prevModel && prevModel.status !== 'processed';
    const isNotUploading = uploadingModel && uploadingModel.status === 'processed';

    // Check if model has been uploaded
    // Once model has uploaded, post new line item
    if (wasUploading && isNotUploading)

      this.saveLineItem(uploadModel.orderPayload);
  }

  saveLineItem(payload) {
    if(payload) {
      const { dispatch, orderResource } = this.props;

      dispatch(Actions.Api.wyatt['line-item'].post(payload))
        .then(response => {
          const newLineItem = response.headers.location;
          const payload = { 'line_items': [ ...orderResource.line_items, newLineItem ]};
          const uuid = extractUuid(orderResource.uri);
          return dispatch(Actions.Api.wyatt.order.put(uuid, payload));
        })
        .then( () => dispatch(Actions.UploadModel.clearState() ))
        .catch( () => dispatch(Actions.UploadModel.clearState() ));
    }
  }

  render() {
    const { apiErrors, fetching, orderResource } = this.props;
    const { uploading } = this.props.uploadModel;
    const loading = fetching || !orderResource;

    if ( uploading )
      return <Uploading />
    return (
      <GateKeeper errors={apiErrors} loading={loading}>
        <EditOrder />
      </GateKeeper>
    );
  }
}

function mapStateToProps(state, props) {
  const { order, material, print, run } = state.ui.wyatt
  const lineItem = state.ui.wyatt['line-item'];
  const { model } = state.ui.hoth
  const orderResource = Selectors.getRouteResource(state, props)

  const { uploadModel } = state;
  const uploadingModel = state.resources[uploadModel.modelUuid]

  const apiErrors = [
    ...Selectors.getResourceErrors(state, "pao.users"),
    ...lineItem.list.errors,
    ...lineItem.delete.errors,
    ...material.list.errors,
    ...model.list.errors,
    ...order.get.errors,
    ...order.delete.errors,
    ...run.list.errors,
  ];

  const fetching = (
    lineItem.list.fetching ||
    material.list.fetching ||
    model.list.fetching ||
    order.get.fetching ||
    order.put.fetching ||
    print.list.fetching ||
    state.ui.wyatt['third-party'].list.fetching ||
    state.ui.wyatt['post-processor-type'].list.fetching ||
    state.ui.wyatt.template.list.fetching
  );

  return {
    apiErrors,
    fetching,
    orderResource,
    model,
    order,
    uploadModel,
    uploadingModel,
  }
}

export default connect(mapStateToProps)(OrderContainer)
