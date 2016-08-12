import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import OrdersComponent          from 'rapidfab/components/plan/orders'


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
  } = state;

  return {
    orders        : _.omit(order, ['uxFetching', 'uxErrors']),
    materials     : _.omit(material, ['uxFetching', 'uxErrors']),
    fetching      : material.uxFetching || order.uxFetching,
    errors        : order.uxErrors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)
