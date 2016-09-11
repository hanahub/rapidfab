import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import PrinterComponent                   from 'rapidfab/components/records/printer'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'printer_type',
  'location'
]

class PrinterContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <PrinterComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/printers"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.location.list())
      dispatch(Actions.Api.wyatt['printer-type'].list())
      if(uuid) {
        dispatch(Actions.Api.wyatt.printer.get(uuid))
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.printer.put(payload.uuid, payload)).then(redirect)
      } else {
        dispatch(Actions.Api.wyatt.printer.post(payload)).then(redirect)
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.printer.delete(uuid)).then(redirect)
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getRouteResource(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.printer"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.printer"),
    locations       : Selectors.getLocations(state),
    printerTypes    : Selectors.getPrinterTypes(state)
  }
}

export default reduxForm({
  form: 'record.printer',
  fields
}, mapStateToProps, mapDispatchToProps)(PrinterContainer)
