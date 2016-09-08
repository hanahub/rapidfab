import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import ManufacturerComponent              from 'rapidfab/components/records/manufacturer'
import { reduxForm }                      from 'redux-form'

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
  'notes'
]

class ManufacturerContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <ManufacturerComponent {...this.props}/>
  }
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
        dispatch(Actions.Api.wyatt.manufacturer.put(payload.uuid, payload))
        window.location.hash = "#/inventory/manufacturers"
      } else {
        dispatch(Actions.Api.wyatt.manufacturer.post(payload))
        window.location.hash = "#/inventory/manufacturers"
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.manufacturer.delete(uuid))
        window.location.hash = "#/inventory/manufacturers"
      }
    }
  }
}

function mapStateToProps(state, props) {
  const {
    manufacturer
  } = state;

  return {
    uuid            : props.route.uuid,
    initialValues   : manufacturer[props.route.uuid],
    submitting      : manufacturer.uxFetching,
    apiErrors       : manufacturer.uxErrors
  }
}

export default reduxForm({
  form: 'record.manufacturer',
  fields
}, mapStateToProps, mapDispatchToProps)(ManufacturerContainer)
