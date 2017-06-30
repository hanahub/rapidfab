import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Actions from "rapidfab/actions"
import * as Selectors from 'rapidfab/selectors'
import { extractUuid } from 'rapidfab/reducers/makeApiReducers'

import Uploading from 'rapidfab/components/Uploading';
import EditOrder from 'rapidfab/components/records/order/edit/EditOrder';
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

  render() {
    const { apiErrors, fetching, orderResource } = this.props;
    const loading = fetching || !orderResource;

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
  }
}

export default connect(mapStateToProps)(OrderContainer)
