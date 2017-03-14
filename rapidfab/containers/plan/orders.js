import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import OrdersComponent          from 'rapidfab/components/plan/orders'
import * as Selectors           from 'rapidfab/selectors'


class OrdersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <OrdersComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.OrderLocation.getOrderLocations())
      dispatch(Actions.Api.wyatt.location.list())
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt.order.list())
    },
    handleOnChange: location => {
      dispatch(Actions.LocationFilter.setLocation(location))
    }
  }
}

function mapStateToProps(state) {
  const {
    order,
    material
  } = state.ui.wyatt;
  const orderLocation = Selectors.getOrderLocations(state)
  const orders = Selectors.getOrders(state)
  let locationFilter = Selectors.getLocationFilter(state)
  let filteredOrders = null
  if(locationFilter) {
    if(locationFilter == "unassigned")
      locationFilter = null
    let ordersForMyLocation = _.filter(orderLocation.ordersByLocation, ['location' , locationFilter])
    if(ordersForMyLocation.length > 0) {
      ordersForMyLocation = ordersForMyLocation[0].orders
      filteredOrders = _.filter(orders, order => { return _.indexOf(ordersForMyLocation, order.uri) >= 0})
    } else {
      filteredOrders = []
    }
  }
  return {
    orders        : filteredOrders || Selectors.getOrders(state),
    materials     : Selectors.getMaterials(state),
    locationFilter: locationFilter,
    locations     : Selectors.getLocations(state),
    fetching      : material.list.fetching || order.list.fetching || orderLocation.fetching,
    apiErrors     : _.concat(order.list.errors, material.list.errors, orderLocation.errors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)
