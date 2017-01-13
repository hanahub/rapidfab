import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import QueuesComponent                  from 'rapidfab/components/work/queues'
import * as Selectors                   from 'rapidfab/selectors'


const QueuesContainer = props => (
  <QueuesComponent {...props}/>
)

function mapDispatchToProps(dispatch) {
  dispatch(Actions.Api.nautilus.modeler.list())
  dispatch(Actions.Api.wyatt['post-processor-type'].list())
  dispatch(Actions.Api.wyatt['post-processor'].list())
  dispatch(Actions.Api.wyatt.printer.list())
  dispatch(Actions.Api.wyatt.run.list())

  return {
  }
}

function mapStateToProps(state) {
  const postProcessor = state.ui.wyatt['post-processor']
  const {
    printer,
    run
  } = state.ui.wyatt

  return {
    machines: Selectors.getMachinesForQueues(state),
    runs: Selectors.getRuns(state),
    fetching: run.list.fetching || printer.list.fetching || postProcessor.list.fetching,
    apiErrors: _.concat(run.list.errors, postProcessor.list.errors, printer.list.errors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuesContainer)
