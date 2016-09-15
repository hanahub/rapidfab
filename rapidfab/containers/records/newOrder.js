import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import { reduxForm }                      from 'redux-form'
import _                                  from "lodash"

import Actions                            from "rapidfab/actions"
import Config                             from 'rapidfab/config'
import { extractUuid }                    from "rapidfab/reducers/makeApiReducers"
import * as Selectors                     from 'rapidfab/selectors'

import NewOrderComponent                  from 'rapidfab/components/records/newOrder'

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

  render() {
    return <NewOrderComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.hoth.model.list())
      dispatch(Actions.Api.wyatt['third-party'].list())
    },
    onSubmit: payload => {
      payload.bureau = Config.BUREAU

      if (false === !!payload.materials.support) delete payload.materials.support
      if (false === !!payload.shipping.name) delete payload.shipping.name
      if (false === !!payload.shipping.address) delete payload.shipping.address
      if (false === !!payload.shipping.tracking) delete payload.shipping.tracking
      if (false === !!payload.third_party_provider) delete payload.third_party_provider

      let modelPayload = {"name" : payload.name}
      dispatch(Actions.Api.hoth.model.post(modelPayload))
      .then( args => {
        dispatch(Actions.UploadModel.upload(args.headers.uploadLocation, payload.model[0]))
        payload.model = args.headers.location;
        dispatch(Actions.Api.wyatt.order.post(payload)).then(() => {
          window.location.hash = '#/plan/orders';
        })
      })
    },
  }
}

function mapStateToProps(state, props) {
  const uploadModel = state.uploadModel
  const {
    material,
    model,
    order,
  } = state.ui.wyatt;

  const fetching =
    material.list.fetching ||
    uploadModel.fetching ||
    order.post.fetching ||
    state.ui.wyatt['third-party'].list.fetching

  const errors = _.concat(
    material.list.errors ||
    uploadModel.errors ||
    order.post.errors ||
    state.ui.wyatt['third-party'].list.errors
  )

  return {
    apiErrors   : order.post.errors,
    errors,
    fetching,
    materials   : Selectors.getMaterials(state),
    model       : Selectors.getModels(state),
    providers   : Selectors.getThirdPartyProviders(state),
    uploadModel : Selectors.getUploadModel(state),
  }
}

export default reduxForm({
  form: 'record.newOrder',
  fields
}, mapStateToProps, mapDispatchToProps)(NewOrderContainer)
