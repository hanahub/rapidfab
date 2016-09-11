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
  'address',
  'created',
  'materials.base',
  'materials.support',
  'model',
  'name',
  'quantity',
  'shipping.address',
]

class NewOrderContainer extends Component {
  componentWillMount() {
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
      if(uuid) {
        dispatch(Actions.Api.hoth.model.get(uuid))
      }
    },
    onSubmit: payload => {
      payload.bureau = Config.BUREAU
      let modelPayload = {"name" : payload.name}
      dispatch(Actions.Api.hoth.model.post(modelPayload))
      .then( args => {
        payload.model = args.headers.location;
        dispatch(Actions.UploadModel.upload(args.headers.uploadLocation, payload.model[0]))
        dispatch(Actions.Api.wyatt.order.post(payload))
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

  if(uploadModel.percent >= 100) {
    uploadModel.percent = 0
    window.location.hash = '#/plan/orders'
  }

  const fetching =
    material.list.fetching ||
    uploadModel.fetching ||
    order.post.fetching

  const errors = _.concat(
    material.list.errors ||
    uploadModel.errors ||
    order.post.errors
  )

  return {
    materials     : Selectors.getMaterials(state),
    uploadModel   : Selectors.getUploadModel(state),
    model         : Selectors.getModels(state),
    fetching,
    errors
  }
}

export default reduxForm({
  form: 'record.newOrder',
  fields
}, mapStateToProps, mapDispatchToProps)(NewOrderContainer)
