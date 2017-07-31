import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Actions from "rapidfab/actions"
import * as Selectors from 'rapidfab/selectors'
import { extractUuid } from 'rapidfab/reducers/makeApiReducers'

import EditOrder from 'rapidfab/components/records/order/edit/EditOrder';
import Error from 'rapidfab/components/error';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';

class OrderContainer extends Component {

  componentDidMount() {
    const { props, props: { bureau, dispatch, route: { uuid }}} = this;

    // Set route UUID in state
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));

    // Fetch order and related resources
    dispatch(Actions.Api.wyatt.order.get(uuid))
      .then( res => {
        dispatch(Actions.Api.wyatt['line-item'].list(
          { 'order': res.json.uri }
        ));
      })

    // Fetch resource options for input selections
    dispatch(Actions.Api.hoth.model.list());
    dispatch(Actions.Api.wyatt.material.list({ bureau: bureau.uri }));
    dispatch(Actions.Api.wyatt['third-party'].list({ bureau: bureau.uri }));
    dispatch(Actions.Api.wyatt['post-processor-type'].list());
    dispatch(Actions.Api.wyatt.template.list({ bureau: bureau.uri }));
    dispatch(Actions.Api.wyatt.shipping.list({ bureau: bureau.uri }));
    dispatch(Actions.Api.pao.users.list({ 'group': props.bureau.group }));
  }

  render() {
    const { order, routeUUID } = this.props;
    const loading = !order || !routeUUID;

    return (
      <div>
        { loading ? <Loading /> :
            <div>
              <FlashMessages />
              <EditOrder />
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const bureau = Selectors.getBureau(state);
  const order = Selectors.getRouteResource(state, props)
  const { routeUUID } = state;

  return {
    bureau,
    order,
    routeUUID,
  }
}

export default connect(mapStateToProps)(OrderContainer)
