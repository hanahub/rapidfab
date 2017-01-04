import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"

import Actions                            from "rapidfab/actions"
import Config                             from 'rapidfab/config'
import { extractUuid }                    from "rapidfab/reducers/makeApiReducers"
import * as Selectors                     from 'rapidfab/selectors'

import NewOrderComponent                  from 'rapidfab/components/records/order/new'

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
    if(prevModel && prevModel.status !== "processed" && model && model.status === "processed") {
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
      dispatch(Actions.Api.wyatt.shipping.list())
      dispatch(Actions.Api.wyatt['post-processor-type'].list())
    },
    onSaveOrder: payload => {
      dispatch(Actions.Api.wyatt.order.post(payload)).then(args => {
        window.location.hash = `#/records/order/${extractUuid(args.headers.location)}`;
      })
    },
    onUnmount: () => {
      dispatch(Actions.UploadModel.clearState())
      dispatch(Actions.UI.clearUIState([
        "wyatt.order.post",
        "wyatt.order.put",
      ]))
    },
    onSubmit: payload => {
      payload.bureau = Config.BUREAU

      if (false === !!payload.materials.support) delete payload.materials.support
      if (false === !!payload.shipping.name) delete payload.shipping.name
      if (false === !!payload.shipping.address) delete payload.shipping.address
      if (false === !!payload.shipping.tracking) delete payload.shipping.tracking
      if (false === !!payload.third_party_provider) delete payload.third_party_provider
      if (false === !!payload.post_processor_type) delete payload.post_processor_type

      dispatch(Actions.Api.hoth.model.post({
        name: payload.name,
        type: "stl",
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
    state.ui.wyatt['third-party'].list.fetching ||
    state.ui.wyatt['post-processor-type'].list.fetching

  const errors = _.concat(
    material.list.errors || [],
    order.post.errors || [],
    state.ui.wyatt['third-party'].list.errors || [],
    state.ui.wyatt['post-processor-type'].list.errors || [],
    state.uploadModel.errors || [],
  )

  const uploadModel = state.uploadModel
  const processingModel = state.resources[uploadModel.modelUuid]

  return {
    combinedErrors     : errors,
    materials          : Selectors.getMaterials(state),
    providers          : Selectors.getThirdPartyProviders(state),
    shippings          : Selectors.getShippings(state),
    postProcessorTypes : Selectors.getPostProcessorTypes(state),
    fetching,
    uploadModel,
    model: processingModel,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderContainer)
