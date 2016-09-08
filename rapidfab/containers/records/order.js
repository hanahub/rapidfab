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
  if(!order || models.length) return ''
  const model_uuid = extractUuid(order.model)
  return Object.keys(models).includes(model_uuid) ? models[model_uuid].snapshot_content : ''
}

function mapStateToProps(state, props) {
  const {
    order,
    material,
    print
  } = state.ui.wyatt

  const {
    model,
  } = state.ui.hoth

  const models          = Selectors.getModels(state)
  const orderResource   = Selectors.getRouteResource(state, props)

  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : orderResource,
    materials       : Selectors.getMaterials(state),
    submitting      : Selectors.getResourceFetching(state, "pao.users") || material.list.fetching || model.list.fetching || print.list.fetching,
    apiErrors       : _.concat(Selectors.getResourceErrors(state, "pao.users"), material.list.errors, model.list.errors),
    snapshot        : getSnapshotFromOrder(orderResource, models),
    prints          : Selectors.getPrints(state),
    models,
    order
  }
}

export default reduxForm({
  form: 'record.order',
  fields
}, mapStateToProps, mapDispatchToProps)(OrderContainer)
