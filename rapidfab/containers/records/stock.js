import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import StockComponent                     from 'rapidfab/components/records/stock'
import { reduxForm }                      from 'redux-form'

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
  const {
    stock,
    location,
    material
  } = state;

  return {
    uuid            : props.route.uuid,
    initialValues   : stock[props.route.uuid],
    materials       : _.omit(material, ['uxFetching', 'uxErrors']),
    locations       : _.omit(location, ['uxFetching', 'uxErrors']),
  }
}

export default reduxForm({
  form: 'record.stock',
  fields
}, mapStateToProps, mapDispatchToProps)(StockContainer)
