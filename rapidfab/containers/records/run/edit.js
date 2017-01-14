import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunsComponent                    from 'rapidfab/components/records/run/edit'
import { reduxForm }                    from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'
import Moment                           from 'moment'

const fields = [
  'actuals.materials.base',
  'actuals.materials.support',
  'actuals.time.print',
  'actuals.time.post_processing',
  'created',
  'estimates.materials.base',
  'estimates.materials.support',
  'estimates.time.print',
  'estimates.time.post_processing',
  'id',
  'model',
  'post_processor',
  'printer',
  'printer_type',
  'status',
  'uri',
  'uuid'
]

class RunsContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props)
  }

  componentWillUnmount() {
    this.props.onUnmount()
  }

  render() {
    return <RunsComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: props => {
      dispatch(Actions.Api.wyatt.run.get(props.route.uuid))
      dispatch(Actions.Api.wyatt.print.list())
      dispatch(Actions.Api.wyatt.order.list())
      dispatch(Actions.Api.wyatt['post-processor'].list())
      dispatch(Actions.Api.wyatt['printer-type'].list())
      dispatch(Actions.Api.wyatt.printer.list())
    },
    onSubmit: payload => {
      dispatch(Actions.Api.wyatt.run.put(payload.uuid, {status: payload.status})).then(
        () => window.location.hash = "#/plan/runs"
      )
    },
    onDelete: uuid => dispatch(Actions.Api.wyatt.run.delete(uuid)).then(
      () => window.location.hash = "#/plan/runs"
    ),
    onModelDownload: (modelURI) => {
      dispatch(Actions.DownloadModel.fetchModel(modelURI)).then((response) => {
        dispatch(Actions.DownloadModel.downloadContent(response.json.content));
      });
    },
    onUnmount: () => {
      dispatch(Actions.UI.clearUIState([
        "wyatt.run.post",
        "wyatt.run.put",
      ]))
    },
  }
}

function mapStateToProps(state, props) {
  const {
    print,
    order,
    run
  } = state.ui.wyatt

  const downloadModel = state.downloadModel;
  const runResource = Selectors.getRouteResource(state, props)
  const orders = Selectors.getOrders(state)
  const prints = Selectors.getPrintsForRun(state, runResource)
  const postProcessors = Selectors.getPostProcessors(state)
  const printerTypes = Selectors.getPrinterTypes(state)
  const printers = Selectors.getPrinters(state)

  return {
    apiErrors     : _.concat(
        print.list.errors,
        order.list.errors,
        run.get.errors,
        run.put.errors,
        run.delete.errors,
        downloadModel.errors,
    ),
    downloadModel,
    initialValues : runResource,
    orders,
    prints,
    resource      : runResource,
    run,
    postProcessors,
    printerTypes,
    printers,
    statuses      : [
      'calculating',
      'calculated',
      'queued',
      'in-progress',
      'complete',
      'error',
    ],
  }
}

export default reduxForm({
  form: 'record.run',
  fields
}, mapStateToProps, mapDispatchToProps)(RunsContainer)
