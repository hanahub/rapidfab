import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import ManufacturersComponent   from 'rapidfab/components/inventory/manufacturers'
import * as Selectors           from 'rapidfab/selectors'


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
  } = state.ui.wyatt

  return {
    locations     : Selectors.getLocations(state),
    manufacturers : Selectors.getManufacturers(state),
    users         : Selectors.getUsers(state),
    fetching      : manufacturer.list.fetching,
    apiErrors     : manufacturer.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturersContainer)
