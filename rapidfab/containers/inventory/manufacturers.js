import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import ManufacturersComponent   from 'rapidfab/components/inventory/manufacturers'


class ManufacturersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <ManufacturersComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => dispatch(Actions.Api.wyatt.manufacturer.list()),
  }
}

function mapStateToProps(state) {
  const {
    manufacturer
  } = state;

  return {
    records   : _.omit(manufacturer, ['uxFetching', 'uxErrors']),
    fetching  : manufacturer.uxFetching,
    apiErrors : manufacturer.uxErrors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturersContainer)
