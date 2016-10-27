import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import { reduxForm }                      from 'redux-form'
import _                                  from "lodash"

import Actions                            from "rapidfab/actions"
import Config                             from 'rapidfab/config'
import { extractUuid }                    from "rapidfab/reducers/makeApiReducers"
import * as Selectors                     from 'rapidfab/selectors'

import NewOrderComponent                  from 'rapidfab/components/records/order/new'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'model',
  'quantity',
  'materials.base',
  'materials.support',
  'shipping.name',
  'shipping.address',
  'shipping.tracking',
  'third_party_provider',
]

class NewOrderContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props.uuid)
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  componentDidUpdate(prevProps, prevState) {
    const { model, uploadModel } = this.props
    const prevModel = prevProps.model
    if(prevModel && prevModel.status === "processing" && model && model.status === "processed" && model.analyses.manifold) {
      this.props.onSaveOrder(uploadModel.orderPayload)
    }
  }

  render() {
    return <NewOrderComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.hoth.model.list())
      dispatch(Actions.Api.wyatt['third-party'].list())
    },
    onSaveOrder: payload => {
      dispatch(Actions.Api.wyatt.order.post(payload)).then(args => {
        window.location.hash = `#/records/order/${extractUuid(args.headers.location)}`;
      })
    },
    onUnmount: () => {
      dispatch(Actions.UploadModel.clearState())
      dispatch(Actions.UI.clearUIState(["wyatt.order.post.errors"]))
    },
    onSubmit: payload => {
      payload.bureau = Config.BUREAU

      if (false === !!payload.materials.support) delete payload.materials.support
      if (false === !!payload.shipping.name) delete payload.shipping.name
      if (false === !!payload.shipping.address) delete payload.shipping.address
      if (false === !!payload.shipping.tracking) delete payload.shipping.tracking
      if (false === !!payload.third_party_provider) delete payload.third_party_provider

      dispatch(Actions.Api.hoth.model.post({
        name: payload.name
      })).then(args => {
        dispatch(Actions.UploadModel.upload(args.headers.uploadLocation, payload.model[0]))
        payload.model = args.headers.location
        dispatch(Actions.UploadModel.storeOrderPayload(payload))
      })
    }
  }
}

function mapStateToProps(state, props) {
  const {
    material,
    model,
    order,
  } = state.ui.wyatt;

  const fetching =
    material.list.fetching ||
    order.post.fetching ||
    state.ui.wyatt['third-party'].list.fetching

  const errors = _.concat(
    material.list.errors ||
    order.post.errors ||
    state.ui.wyatt['third-party'].list.errors
  )

  const uploadModel = state.uploadModel
  const processingModel = state.resources[uploadModel.modelUuid]

  return {
    apiErrors   : order.post.errors,
    materials   : Selectors.getMaterials(state),
    providers   : Selectors.getThirdPartyProviders(state),
    fetching,
    uploadModel,
    model: processingModel,
  }
}

export default reduxForm({
  form: 'record.newOrder',
  fields
}, mapStateToProps, mapDispatchToProps)(NewOrderContainer)
