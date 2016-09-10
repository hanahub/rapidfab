import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import MaterialComponent                  from 'rapidfab/components/records/material'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'description',
  'color',
  'type',
  'manufacturer',
  'retail_price.currency',
  'retail_price.amount',
  'third_party_fulfillment',
  'post_processing_seconds'
]

class MaterialContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <MaterialComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.manufacturer.list())
      if(uuid) {
        dispatch(Actions.Api.wyatt.material.get(uuid))
      }
    },
    onSubmit: payload => {
      if(!payload.third_party_fulfillment){ payload.third_party_fulfillment = false}
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.material.put(payload.uuid, payload))
        window.location.hash = "#/inventory/materials"
      } else {
        dispatch(Actions.Api.wyatt.material.post(payload))
        window.location.hash = "#/inventory/materials"
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.material.delete(uuid))
        window.location.hash = "#/inventory/materials"
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getRouteResource(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.material"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.material"),
    manufacturers   : Selectors.getManufacturers(state)
  }
}

export default reduxForm({
  form: 'record.material',
  fields
}, mapStateToProps, mapDispatchToProps)(MaterialContainer)
