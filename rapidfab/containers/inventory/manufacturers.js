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
    //    onInitialize: () => dispatch(Actions.Api.wyatt.manufacturer.list()),
    onInitialize: () => dispatch(Actions.Api.hoth.model.list()),
  }
}

function mapStateToProps(state) {
  const {
    model
  } = state;

  return {
    records   : _.omit(model, ['uxFetching', 'uxErrors']),
    fetching  : model.uxFetching,
    errors    : model.uxErrors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturersContainer)
