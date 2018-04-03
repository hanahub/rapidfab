import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import { filter } from 'lodash';

import {
  getOrderLocations,
  getOrders,
  getLocationFilter,
  getLocations,
} from 'rapidfab/selectors';

import Orders from 'rapidfab/components/plan/orders';

class OrdersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize();
  }

  render() {
    return <Orders {...this.props} />;
  }
}

OrdersContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.OrderLocation.getOrderLocations());
      dispatch(Actions.Api.wyatt.location.list());
      dispatch(Actions.Api.wyatt.order.list());
    },
    handleOnChange: location => {
      dispatch(Actions.LocationFilter.setLocation(location));
    },
  };
}

function mapStateToProps(state) {
  const { list: orderApi } = state.ui.wyatt.order;
  const orderLocation = getOrderLocations(state);
  const stateOrders = getOrders(state);
  let locationFilter = getLocationFilter(state);
  let filteredOrders = null;
  if (locationFilter) {
    if (locationFilter === 'unassigned') {
      locationFilter = null;
    }
    let ordersForMyLocation = orderLocation.ordersByLocation.filter;
    filter(orderLocation.ordersByLocation, ['location', locationFilter]);
    if (ordersForMyLocation.length > 0) {
      ordersForMyLocation = ordersForMyLocation[0].orders;
      filteredOrders = filter(
        stateOrders,
        order => ordersForMyLocation.indexOf(order.uri) >= 0
      );
    } else {
      filteredOrders = [];
    }
  }
  const orders = filteredOrders || getOrders(state);
  return {
    fetching:
      orderApi.count === 0 || (orderApi.count === 1 && orderApi.fetching),
    orders,
    locationFilter,
    locations: getLocations(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
