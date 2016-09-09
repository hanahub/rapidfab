import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import { extractUuid }                    from "rapidfab/reducers/makeApiReducers"
import NewOrderComponent                  from 'rapidfab/components/records/newOrder'
import { reduxForm }                      from 'redux-form'
import Config                             from 'rapidfab/config'

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
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.order.delete(uuid))
        window.location.hash = "#/inventory/orders"
      }
    }
  }
}

function mapStateToProps(state, props) {
  const {
    material,
    model,
    uploadModel,
  } = state;
  if(uploadModel.percent == 100) {
    state.model = _.omit(state.model, ['uxFetching', 'uxErrors']),
    window.location.hash = `/#/inventory/orders/edit/${_.keys(state.model)[0]}`
  }
  return {
    uuid            : props.route.uuid,
    initialValues   : model[props.route.uuid],
    materials       : _.omit(material, ['uxFetching', 'uxErrors']),
    uploadModel     : _.omit(uploadModel, ['uxFetching', 'uxErrors']),
    model           : _.omit(model, ['uxFetching', 'uxErrors']),
  }
}

export default reduxForm({
  form: 'record.newOrder',
  fields
}, mapStateToProps, mapDispatchToProps)(NewOrderContainer)
