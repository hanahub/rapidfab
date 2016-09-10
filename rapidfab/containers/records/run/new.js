import _                                from "lodash"
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunComponent                     from 'rapidfab/components/records/run/new'
import * as Selectors                   from 'rapidfab/selectors'


class RunContainer extends Component {
  componentWillMount() {
    //    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <RunComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.printer.list())
      dispatch(Actions.Api.wyatt.print.list())
      dispatch(Actions.Api.wyatt.order.list())
      dispatch(Actions.Api.wyatt.material.list())
    },
    onSave: payload => dispatch(Actions.Api.wyatt.run.post(payload))
  }
}

function mapStateToProps(state) {
  const {
    order,
    material,
    print,
    printer,
    run
  } = state.ui.wyatt

  const fetching =
    order.list.fetching ||
    material.list.fetching ||
    print.list.fetching ||
    printer.list.fetching ||
    run.post.fetching

  const errors = _.concat(
    order.list.errors,
    material.list.errors,
    order.list.errors,
    print.list.errors,
    printer.list.errors,
    run.post.errors
  )

  return {
    orders        : Selectors.getOrders(state),
    materials     : Selectors.getMaterials(state),
    prints        : Selectors.getPrintsCreated(state),
    printers      : Selectors.getPrinters(state),
    fetching,
    errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunContainer)
