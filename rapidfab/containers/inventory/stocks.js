import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import StocksComponent          from 'rapidfab/components/inventory/stocks'
import * as Selectors           from 'rapidfab/selectors'


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
  } = state.ui.wyatt

  return {
    materials     : Selectors.getMaterials(state),
    locations     : Selectors.getLocations(state),
    stocks        : Selectors.getStocks(state),
    fetching      : material.list.fetching || location.list.fetching || stock.list.fetching,
    apiErrors        : _.concat(material.list.errors, location.list.errors, stock.list.errors),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer)
