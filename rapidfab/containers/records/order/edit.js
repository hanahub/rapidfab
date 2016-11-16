import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import OrderComponent                     from 'rapidfab/components/records/order/edit'
import { reduxForm }                      from 'redux-form'
import { extractUuid }                    from 'rapidfab/reducers/makeApiReducers'
import Config                             from 'rapidfab/config'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'bureau',
  'model',
  'materials.base',
  'materials.support',
  'estimates.print_time',
  'estimates.shipping_date',
  'estimates.cost.amount',
  'estimates.cost.currency',
  'estimates.materials.base',
  'estimates.materials.support',
  'shipping.name',
  'shipping.address',
  'shipping.tracking',
  'third_party_provider',
  'quantity',
  'created',
  'currency',
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
      dispatch(Actions.Api.wyatt.run.list())
      dispatch(Actions.Api.wyatt['third-party'].list())
      if(props.route.uuid) {
        dispatch(Actions.Api.wyatt.order.get(props.route.uuid))
        dispatch(Actions.Api.wyatt.print.list({'order': props.order.uri}))
      }
    },
    onSubmit: payload => {
      delete payload.estimates
      if (false === !!payload.materials.support) delete payload.materials.support
      if (false === !!payload.shipping.name) delete payload.shipping.name
      if (false === !!payload.shipping.address) delete payload.shipping.address
      if (false === !!payload.shipping.tracking) delete payload.shipping.tracking
      if (false === !!payload.third_party_provider) delete payload.third_party_provider

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
  if(!order || models.length === 0) return ''
  const model = models.filter(model => model.uri === order.model)
  return (model && model.length) ? model[0].snapshot_content : ''
}

function mapStateToProps(state, props) {
  const {
    order,
    material,
    print,
  } = state.ui.wyatt

  const {
    model,
  } = state.ui.hoth

  const models          = Selectors.getModels(state)
  const orderResource   = Selectors.getRouteResource(state, props)
  const runs            = Selectors.getRunsForOrder(state, orderResource)
  const snapshot        = getSnapshotFromOrder(orderResource, models)

  const fetching =
    material.list.fetching ||
    order.get.fetching ||
    order.put.fetching ||
    print.list.fetching ||
    state.ui.wyatt['third-party'].list.fetching

  return {
    apiErrors         : _.concat(Selectors.getResourceErrors(state, "pao.users"), material.list.errors, model.list.errors),
    fetching,
    initialValues     : orderResource,
    materials         : Selectors.getMaterials(state),
    models,
    modelsIsFetching  : model.list.fetching,
    order,
    prints            : Selectors.getPrintsForOrder(state, orderResource),
    providers         : Selectors.getThirdPartyProviders(state),
    runs,
    snapshot,
    uuid              : Selectors.getRoute(state, props).uuid,
  }
}

export default reduxForm({
  form: 'record.order',
  fields
}, mapStateToProps, mapDispatchToProps)(OrderContainer)
