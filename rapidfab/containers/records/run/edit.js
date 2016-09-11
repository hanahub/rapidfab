import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunsComponent                    from 'rapidfab/components/records/run/edit'
import { reduxForm }                    from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'status',
  'estimates.time.print',
  'estimates.time.post_processing',
  'estimates.materials.base',
  'estimates.materials.support',
  'actuals.time.print',
  'actuals.time.post_processing',
  'actuals.materials.base',
  'actuals.materials.support',
  'created'
]

class RunsContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props)
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
    },
    onSubmit: payload => {
      dispatch(Actions.Api.wyatt.run.put(payload.uuid, {status: payload.status})).then(
        () => window.location.hash = "#/plan/runs"
      )
    },
    onDelete: uuid => dispatch(Actions.Api.wyatt.run.delete(uuid)).then(
      () => window.location.hash = "#/plan/runs"
    )
  }
}

function mapStateToProps(state, props) {
  const {
    print,
    order,
    run
  } = state.ui.wyatt

  const runResource = Selectors.getRouteResource(state, props)
  const orders = Selectors.getOrders(state)
  let prints = []
  if (runResource) {
    prints = Selectors.getPrints(state)
    prints = runResource.prints.map(uri => {
      const match = prints.filter(print => print.uri === uri)
      // when there is no match, just display the id of the run
      return match.length > 0 ? match : {id: uri.slice(-7, -1), order: null}
    })
  }

  return {
    apiErrors     : _.concat(
        print.list.errors,
        order.list.errors,
        run.get.errors,
        run.put.errors,
        run.delete.errors,
    ),
    initialValues : runResource,
    orders,
    prints,
    resource      : runResource,
    run,
    statuses      : [
      'calculating',
      'calculated',
      'queued',
      'printing',
      'post-processing',
      'complete',
      'error',
    ],
  }
}

export default reduxForm({
  form: 'record.run',
  fields
}, mapStateToProps, mapDispatchToProps)(RunsContainer)
