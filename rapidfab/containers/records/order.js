import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import OrderComponent                     from 'rapidfab/components/records/order'
import { reduxForm }                      from 'redux-form'
import { extractUuid }                    from 'rapidfab/reducers/makeApiReducers'
import Config                             from 'rapidfab/config'
import * as Selectors                     from 'rapidfab/selectors'

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
    this.props.onInitialize(this.props)
  }

  render() {
    return <OrderComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: props => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.hoth.model.list())
      if(props.route.uuid) {
        dispatch(Actions.Api.wyatt.order.get(props.route.uuid))
        dispatch(Actions.Api.wyatt.print.list({'order': props.order.uri}))
      }
    },
    onSubmit: payload => {
      delete payload.estimates
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.order.put(payload.uuid, payload)).then(
          () => window.location.hash = "#/plan/orders"
        )
      } else {
        payload.bureau = Config.BUREAU
        dispatch(Actions.Api.wyatt.order.post(payload)).then(
          () => window.location.hash = "#/plan/orders"
        )
      }
    },
    onDelete: uuid => dispatch(Actions.Api.wyatt.order.delete(uuid)).then(
      () => window.location.hash = "#/plan/orders"
    )
  }
}

function getSnapshotFromOrder(order, models) {
  const model_uuid = extractUuid(order.model)
  return Object.keys(models).includes(model_uuid) ? models[model_uuid].snapshot_content : ''
}

function mapStateToProps(state, props) {
  const {
    order,
    material,
    model,
    print
  } = state;

  const models = _.omit(model, ['uxFetching', 'uxErrors'])
  const snapshot = getSnapshotFromOrder(order[props.route.uuid], models)

  return {
    uuid            : props.route.uuid,
    initialValues   : order[props.route.uuid],
    materials       : _.omit(material, ['uxFetching', 'uxErrors']),
    models,
    submitting      : order.uxFetching || material.uxFetching || model.uxFetching,
    apiErrors       : _.concat(order.uxErrors, material.uxErrors, model.uxErrors),
    snapshot,
    order           : order[props.route.uuid],
    prints          : _.omit(print, ['uxFetching', 'uxErrors'])
  }
}

export default reduxForm({
  form: 'record.order',
  fields
}, mapStateToProps, mapDispatchToProps)(OrderContainer)
