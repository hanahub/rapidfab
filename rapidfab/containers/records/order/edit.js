import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import { reduxForm }                      from 'redux-form'
import Config                             from 'rapidfab/config'
import * as Selectors                     from 'rapidfab/selectors'
import { extractUuid }                    from 'rapidfab/reducers/makeApiReducers'

import OrderComponent                     from 'rapidfab/components/records/order/edit'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'model',
  'materials.base',
  'materials.support',
  'estimates.print_time',
  'estimates.cost.amount',
  'estimates.cost.shipping_amount',
  'estimates.cost.currency',
  'estimates.materials.base',
  'estimates.materials.support',
  'shipping.name',
  'shipping.address',
  'shipping.tracking',
  'shipping.uri',
  'third_party_provider',
  'post_processor_type',
  'template',
  'quantity',
  'created',
  'currency',
  'status',
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
      if(props.route.uuid) {
        dispatch(Actions.Api.wyatt.order.get(props.route.uuid)).then(
          response => {
            dispatch(Actions.Api.hoth.model.get(extractUuid(response.json.model)))
            const modelSwappable = ['new', 'calculating_estimates', 'pending'].indexOf(response.json.status) >= 0
            if(modelSwappable) {
              dispatch(Actions.Api.hoth.model.list())
            }
          }
        )
        dispatch(Actions.Api.wyatt.print.list({'order': props.order.uri}))
      }
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt.run.list())
      dispatch(Actions.Api.wyatt['third-party'].list())
      dispatch(Actions.Api.wyatt['post-processor-type'].list())
      dispatch(Actions.Api.wyatt.template.list())
      dispatch(Actions.Api.wyatt.shipping.list())
    },
    onSubmit: payload => {
      delete payload.estimates
      if (false === !!payload.materials.support) delete payload.materials.support
      if (false === !!payload.shipping.name) delete payload.shipping.name
      if (false === !!payload.shipping.address) delete payload.shipping.address
      if (false === !!payload.shipping.tracking) delete payload.shipping.tracking
      if (false === !!payload.third_party_provider) delete payload.third_party_provider
      if (false === !!payload.post_processor_type) payload.post_processor_type = null

      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.order.put(payload.uuid, payload)).then(
          () => window.location.hash = "#/plan/orders"
        )
      } else {
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
    state.ui.wyatt['third-party'].list.fetching ||
    state.ui.wyatt['post-processor-type'].list.fetching

  const statusOptions = {
    pending  : ["cancelled", "confirmed"],
    confirmed: ["cancelled"],
    printing : ["cancelled"],
    printed  : ["cancelled", "shipping", "complete"],
    shipping : ["cancelled", "complete"],
  }

  return {
    apiErrors         : _.concat(Selectors.getResourceErrors(state, "pao.users"), material.list.errors, model.list.errors, order.delete.errors),
    fetching,
    initialValues     : orderResource,
    materials         : Selectors.getMaterials(state),
    models,
    modelsIsFetching  : model.list.fetching | model.get.fetching,
    order,
    prints            : Selectors.getPrintsForOrder(state, orderResource),
    providers         : Selectors.getThirdPartyProviders(state),
    postProcessorTypes: Selectors.getPostProcessorTypes(state),
    shippings         : Selectors.getShippings(state),
    runs,
    snapshot,
    templates         : Selectors.getTemplates(state),
    uuid              : Selectors.getRoute(state, props).uuid,
    statusOptions,
  }
}

export default reduxForm({
  form: 'record.order',
  fields
}, mapStateToProps, mapDispatchToProps)(OrderContainer)
