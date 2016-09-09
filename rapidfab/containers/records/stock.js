import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import StockComponent                     from 'rapidfab/components/records/stock'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'material',
  'location',
  'status',
  'quantity',
  'units'
]

class StockContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <StockComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt.location.list())
      if(uuid) dispatch(Actions.Api.wyatt.stock.get(uuid))
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.stock.put(payload.uuid, payload))
        window.location.hash = "#/inventory/stocks"
      } else {
        dispatch(Actions.Api.wyatt.stock.post(payload))
        window.location.hash = "#/inventory/stocks"
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.stock.delete(uuid))
        window.location.hash = "#/inventory/stocks"
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getRouteResource(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.stock"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.stock"),
    materials       : Selectors.getMaterials(state),
    locations       : Selectors.getLocations(state)
  }
}

export default reduxForm({
  form: 'record.stock',
  fields
}, mapStateToProps, mapDispatchToProps)(StockContainer)
