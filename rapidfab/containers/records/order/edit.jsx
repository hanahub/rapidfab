import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';
import extractUuid from 'rapidfab/utils/extractUuid';

import EditOrder from 'rapidfab/components/records/order/edit/EditOrder';
import FlashMessages from 'rapidfab/components/FlashMessages';
import Loading from 'rapidfab/components/Loading';

class OrderContainer extends Component {
  componentDidMount() {
    const { props: { bureau, dispatch, route: { uuid } } } = this;

    // Set route UUID in state
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));

    // Fetch order and related resources
    dispatch(Actions.Api.wyatt.order.get(uuid)).then(res => {
      dispatch(Actions.Api.wyatt['line-item'].list({ order: res.json.uri })).then(lineItemsResponse => {
        lineItemsResponse.json.resources.map(lineItem => {
          if(lineItem.model) {
            const uuid = extractUuid(lineItem.model);
            dispatch(Actions.Api.hoth.model.get(uuid));
          }
        });
      });
      if (res.json.channel_representative) {
        dispatch(Actions.Api.pao.users.get(res.json.channel_representative));
      }
      if (res.json.order_owner) {
        dispatch(Actions.Api.pao.users.get(res.json.order_owner));
      }
      if (res.json.sales_representative) {
        dispatch(Actions.Api.pao.users.get(res.json.sales_representative));
      }
    });

    // Fetch resource options for input selections
    dispatch(Actions.Api.wyatt['process-step'].list());
    dispatch(Actions.Api.wyatt.material.list({ bureau }));
    dispatch(Actions.Api.wyatt['third-party'].list({ bureau }));
    dispatch(Actions.Api.wyatt['post-processor-type'].list());
    dispatch(Actions.Api.wyatt.template.list({ bureau }));
    dispatch(Actions.Api.wyatt.shipping.list({ bureau }));
    dispatch(Actions.Api.pao.users.list());
  }

  render() {
    const { order, route, routeUUID } = this.props;
    const loading = !order || !routeUUID || routeUUID !== route.uuid;

    return (
      <div>
        <FlashMessages />
        {loading ? <Loading /> : <EditOrder />}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const bureau = Selectors.getBureauUri(state);
  const order = Selectors.getRouteResource(state, props);
  const { routeUUID } = state;

  return {
    bureau,
    order,
    routeUUID,
  };
}

OrderContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.shape({}).isRequired,
  order: PropTypes.shape({}).isRequired,
  routeUUID: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(OrderContainer);
