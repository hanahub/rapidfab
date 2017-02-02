import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import Config                             from 'rapidfab/config'
import ManufacturerComponent              from 'rapidfab/components/records/manufacturer'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'contact.name',
  'contact.phone',
  'support.name',
  'support.phone',
  'address',
  'notes',
  'bureau'
]

class ManufacturerContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <ManufacturerComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/manufacturers"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.manufacturer.get(uuid))
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.manufacturer.put(payload.uuid, payload)).then(redirect)
      } else {
        dispatch(Actions.Api.wyatt.manufacturer.post(payload)).then(redirect)
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.manufacturer.delete(uuid)).then(redirect)
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getRouteResource(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.manufacturer"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.manufacturer"),
    initialValues   : Selectors.getInitialValuesBureau(state, props),
  }
}

export default reduxForm({
  form: 'record.manufacturer',
  fields
}, mapStateToProps, mapDispatchToProps)(ManufacturerContainer)
