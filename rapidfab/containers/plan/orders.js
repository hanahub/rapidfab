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
  const locationFilter = Selectors.getLocationFilter(state)
  const orders = Selectors.getOrders(state)
  let filteredOrders = null;
  if(locationFilter) {
     let ordersForMyLocation = _.filter(orderLocation.ordersByLocation, ['location' , state.locationFilter.location])[0].orders;
     filteredOrders = _.filter(orders, order => { return _.indexOf(ordersForMyLocation, order.uri) >= 0})
  }
  return {
    orders        : filteredOrders || Selectors.getOrders(state),
    materials     : Selectors.getMaterials(state),
    locationFilter: locationFilter,
    locations     : Selectors.getLocations(state),
    fetching      : material.list.fetching || order.list.fetching || orderLocaiton.fetching,
    apiErrors     : _.concat(order.list.errors, material.list.errors, orderLocation.errors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)
