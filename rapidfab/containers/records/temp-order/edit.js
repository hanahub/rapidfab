import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import _ from "lodash"
import { reduxForm } from 'redux-form'

import Actions from "rapidfab/actions"
import * as Selectors from 'rapidfab/selectors'
import { extractUuid } from 'rapidfab/reducers/makeApiReducers'
import EditOrder from 'rapidfab/components/records/order/temp-edit/EditOrder';
import GateKeeper from 'rapidfab/components/gatekeeper';

class OrderContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props)
  }

  render() {
    const { apiErrors, fetching, orderResource } = this.props;
    const loading = fetching || !orderResource;
    return (
      <GateKeeper errors={apiErrors} loading={loading}>
        <EditOrder orderResource={orderResource}/>
      </GateKeeper>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: props => {
      if(props.route.uuid) {
        dispatch(Actions.RouteUUID.setRouteUUID(props.route.uuid));
        dispatch(Actions.Api.wyatt.order.get(props.route.uuid)).then(
          response => {
            dispatch(Actions.Api.hoth.model.get(extractUuid(response.json.model)))
            const modelSwappable = ['new', 'calculating_estimates', 'pending'].indexOf(response.json.status) >= 0
            if(modelSwappable) {
              dispatch(Actions.Api.hoth.model.list())
            }
          }
        )
        dispatch(Actions.Api.wyatt.print.list({'order': props.order.uri}))
      }
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt.run.list())
      dispatch(Actions.Api.wyatt['third-party'].list())
      dispatch(Actions.Api.wyatt['post-processor-type'].list())
      dispatch(Actions.Api.wyatt.template.list())
      dispatch(Actions.Api.wyatt.shipping.list())
    },
  }
}

function mapStateToProps(state, props) {
  const { order, material, print } = state.ui.wyatt
  const { model } = state.ui.hoth
  const orderResource = Selectors.getRouteResource(state, props)

  const apiErrors = _.concat(
    Selectors.getResourceErrors(state, "pao.users"),
    material.list.errors,
    model.list.errors,
    order.delete.errors
  );

  const fetching =
    material.list.fetching ||
    order.get.fetching ||
    order.put.fetching ||
    print.list.fetching ||
    state.ui.wyatt['third-party'].list.fetching ||
    state.ui.wyatt['post-processor-type'].list.fetching

  return {
    apiErrors,
    fetching,
    orderResource,
    model,
    order,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer)
