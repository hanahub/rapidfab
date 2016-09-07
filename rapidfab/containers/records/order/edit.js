import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import { extractUuid }                    from "rapidfab/reducers/makeApiReducers"
import EditComponent                      from 'rapidfab/components/records/edit'
import { reduxForm }                      from 'redux-form'
import Config                             from 'rapidfab/config'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'base_material',
  'support_material',
  'address',
  'quantity',
  'created',
  'model',
]

class EditContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <EditComponent {...this.props}/>
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
      payload.materials = { 'base' : payload.base_material, 'support' : payload.support_material }
      delete payload.base_material
      delete payload.support_material
      payload.shipping = { 'address' : payload.address }
      delete payload.address
      payload.bureau = Config.BUREAU
      let modelPayload = {"name" : payload.name}
      dispatch(Actions.Api.hoth.model.post(modelPayload))
      .then(  args => {
        payload.model = args.headers.location;
        dispatch(Actions.UploadModel.upload(args.headers.uploadLocation, payload.model[0]))
        .then( () => dispatch(Actions.Api.wyatt.order.post(payload)));
        return args;
      })
      .then( args => window.location.hash = `/#/inventory/orders/edit/${extractUuid(args.headers.location)}`)
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

  return {
    uuid            : props.route.uuid,
    initialValues   : model[props.route.uuid],
    materials       : _.omit(material, ['uxFetching', 'uxErrors']),
    uploadModel     : _.omit(uploadModel, ['uxFetching', 'uxErrors']),
    model           : _.omit(model, ['uxFetching', 'uxErrors']),
  }
}

export default reduxForm({
  form: 'record.edit',
  fields
}, mapStateToProps, mapDispatchToProps)(EditContainer)
