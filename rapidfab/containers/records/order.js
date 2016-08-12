import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import OrderComponent                     from 'rapidfab/components/records/order'
import { reduxForm }                      from 'redux-form'
import { extractUuid }                    from 'rapidfab/reducers/makeApiReducers'
import Config                             from 'rapidfab/config'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'bereau',
  'model',
  'materials.base',
  'materials.support',
  'estimates.print_time',
  'estimates.shipping_date',
  'estimates.cost.amount',
  'estimates.cost.currency',
  'estimates.materials.base',
  'estimates.materials.support',
  'shipping.address',
  'quantity',
  'created'
]

class OrderContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <OrderComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.hoth.model.list())
      if(uuid) dispatch(Actions.Api.wyatt.order.get(uuid))
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.order.put(payload.uuid, payload))
        window.location.hash = "#/plan/orders"
      } else {
        payload.bureau = Config.BUREAU
        dispatch(Actions.Api.wyatt.order.post(payload))
        window.location.hash = "#/plan/orders"
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.order.delete(uuid))
        window.location.hash = "#/plan/orders"
      }
    }
  }
}

function mapStateToProps(state, props) {
  const {
    order,
    material,
    model
  } = state;

  return {
    uuid            : props.route.uuid,
    initialValues   : order[props.route.uuid],
    materials       : _.omit(material, ['uxFetching', 'uxErrors']),
    models          : _.omit(model, ['uxFetching', 'uxErrors'])
  }
}

export default reduxForm({
  form: 'record.order',
  fields
}, mapStateToProps, mapDispatchToProps)(OrderContainer)
