import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import StocksComponent          from 'rapidfab/components/inventory/stocks'


class StocksContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <StocksComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt.location.list())
      dispatch(Actions.Api.wyatt.stock.list())
    }
  }
}

function mapStateToProps(state) {
  const {
    material,
    location,
    stock
  } = state;

  return {
    materials     : _.omit(material, ['uxFetching', 'uxErrors']),
    locations     : _.omit(location, ['uxFetching', 'uxErrors']),
    stocks        : _.omit(stock, ['uxFetching', 'uxErrors']),
    fetching      : material.uxFetching || location.uxFetching || stock.uxFetching,
    apiErrors     : _.concat(stock.uxErrors, location.uxErrors, material.uxErrors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer)
