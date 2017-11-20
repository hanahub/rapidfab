import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import OrdersComponent from 'rapidfab/components/plan/orders';
import * as Selectors from 'rapidfab/selectors';

class OrdersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.bureau);
  }

  render() {
    return <OrdersComponent {...this.props} />;
  }
}

OrdersContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  onInitialize: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
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
  const orderLocation = Selectors.getOrderLocations(state);
  const stateOrders = Selectors.getOrders(state);
  let locationFilter = Selectors.getLocationFilter(state);
  let filteredOrders = null;
  if (locationFilter) {
    if (locationFilter === 'unassigned') {
      locationFilter = null;
    }
    let ordersForMyLocation = _.filter(orderLocation.ordersByLocation, [
      'location',
      locationFilter,
    ]);
    if (ordersForMyLocation.length > 0) {
      ordersForMyLocation = ordersForMyLocation[0].orders;
      filteredOrders = _.filter(
        stateOrders,
        order => _.indexOf(ordersForMyLocation, order.uri) >= 0
      );
    } else {
      filteredOrders = [];
    }
  }
  const orders = filteredOrders || Selectors.getOrders(state);
  return {
    bureau: Selectors.getBureauUri(state),
    fetching: orderApi.count === 0 || (orderApi.count === 1 && orderApi.fetching),
    orders: orders,
    locationFilter,
    locations: Selectors.getLocations(state),
    apiErrors: _.concat( orderApi.errors ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
