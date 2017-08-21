import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from 'rapidfab/actions';
import HomeComponent from 'rapidfab/components/home';
import * as Selectors from 'rapidfab/selectors';

class HomeContainer extends Component {
  componentWillMount() {
    this.props.onInitialize();
  }
  render() {
    return <HomeComponent {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.run.list());
      dispatch(Actions.Api.wyatt.order.list());
      dispatch(Actions.Api.wyatt.location.list());
      dispatch(Actions.OrderLocation.getOrderLocations());
    },
    handleOnChange: location => {
      dispatch(Actions.LocationFilter.setLocation(location));
    },
  };
}

function mapStateToProps(state) {
  const { run, order, location } = state.ui.wyatt;
  const orderLocation = Selectors.getOrderLocations(state);
  const orders = Selectors.getOrders(state);
  const runs = Selectors.getRuns(state);
  let locationFilter = Selectors.getLocationFilter(state);
  let filteredRuns = null;
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
        orders,
        order => _.indexOf(ordersForMyLocation, order.uri) >= 0
      );
      filteredOrders = _.slice(filteredOrders, 0, 10);
    } else {
      filteredOrders = [];
    }
    filteredRuns = _.filter(runs, ['location', state.locationFilter.location]);
    filteredRuns = Selectors.getRunStatusChart(filteredRuns);
  }
  return {
    fetching:
      order.list.fetching ||
      run.list.fetching ||
      location.list.fetching ||
      orderLocation.fetching,
    apiErrors: _.concat(
      order.list.errors,
      run.list.errors,
      location.list.errors,
      orderLocation.errors
    ),
    locationFilter,
    locations: Selectors.getLocations(state),
    data: {
      runStatus: filteredRuns || Selectors.getRunStatusChartData(state),
      lastTenOrders: filteredOrders || Selectors.getLastTenOrders(state),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);