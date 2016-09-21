import React, { Component, PropTypes }  from "react"
import { connect }                      from 'react-redux'
import HomeComponent                    from 'rapidfab/components/home'
import Actions                          from 'rapidfab/actions'
import * as Selectors                   from 'rapidfab/selectors'

class HomeContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }
  render() {
    return <HomeComponent {...this.props} />
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.run.list())
      dispatch(Actions.Api.wyatt.order.list())
    }
  }
}

function mapStateToProps(state) {
  const {
    run,
    order,
  } = state.ui.wyatt

  return {
    fetching        : order.list.fetching || run.list.fetching,
    apiErrors       : _.concat(order.list.errors, run.list.errors),
    data            : {
      runStatus     : Selectors.getRunStatusChartData(state),
      lastTenOrders : Selectors.getLastTenOrders(state)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
