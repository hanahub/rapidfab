import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import ShippingsComponent   from 'rapidfab/components/inventory/shipping'
import * as Selectors           from 'rapidfab/selectors'


class ShippingsContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <ShippingsComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => dispatch(Actions.Api.wyatt.shipping.list()),
  }
}

function mapStateToProps(state) {
  const {
    shipping
  } = state.ui.wyatt

  return {
    locations     : Selectors.getLocations(state),
    shippings     : Selectors.getShippings(state),
    users         : Selectors.getUsers(state),
    fetching      : shipping.list.fetching,
    apiErrors     : shipping.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingsContainer)
