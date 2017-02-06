import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import Config                             from 'rapidfab/config'
import PrinterTypeComponent               from 'rapidfab/components/records/printerType'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'description',
  'manufacturer',
  'build_volume.x',
  'build_volume.y',
  'build_volume.z',
  'materials',
  'bureau'
]

class PrinterTypeContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <PrinterTypeComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/printer-types"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.wyatt.manufacturer.list())
      if(uuid) {
        dispatch(Actions.Api.wyatt['printer-type'].get(uuid))
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt['printer-type'].put(payload.uuid, payload)).then(redirect)
      } else {
        dispatch(Actions.Api.wyatt['printer-type'].post(payload)).then(redirect)
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt['printer-type'].delete(uuid)).then(redirect)
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getInitialValuesBureau(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.printer-type"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.printer-type"),
    manufacturers   : Selectors.getManufacturers(state),
    materials       : Selectors.getMaterials(state),
  }
}

export default reduxForm({
  form: 'record.printerType',
  fields
}, mapStateToProps, mapDispatchToProps)(PrinterTypeContainer)
