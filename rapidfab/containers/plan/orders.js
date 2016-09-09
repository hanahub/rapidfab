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
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt.order.list())
    }
  }
}

function mapStateToProps(state) {
  const {
    order,
    material
  } = state.ui.wyatt;

  return {
    orders        : Selectors.getOrders(state),
    materials     : Selectors.getMaterials(state),
    fetching      : material.list.fetching || order.list.fetching,
    errors        : _.concat(order.list.errors, material.list.errors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)
