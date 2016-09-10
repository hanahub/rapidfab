import _                                from "lodash"
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunComponent                     from 'rapidfab/components/records/run/new'
import * as Selectors                   from 'rapidfab/selectors'
import Fa                               from 'react-fontawesome'
import * as BS                          from 'react-bootstrap'


const Loading = ({  }) => (
  <BS.Row>
    <BS.Col xs={12}>
      <div style={{ textAlign: "center" }}>
        <Fa name="spinner" spin size='2x' />
      </div>
    </BS.Col>
  </BS.Row>
)

class RunContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return this.props.loading ? <Loading/> : <RunComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.printer.list())
      dispatch(Actions.Api.wyatt['printer-type'].list())
      dispatch(Actions.Api.wyatt.print.list())
      dispatch(Actions.Api.wyatt.order.list())
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.hoth.model.list())
    },
    onSave: payload => dispatch(Actions.Api.wyatt.run.post(payload))
  }
}

function mapStateToProps(state) {
  const printerType = state.ui.wyatt['printer-type']
  const {
    order,
    material,
    print,
    printer,
    run
  } = state.ui.wyatt

  const {
    model
  } = state.ui.hoth

  const fetching =
    order.list.fetching ||
    material.list.fetching ||
    print.list.fetching ||
    printer.list.fetching ||
    model.list.fetching ||
    run.post.fetching ||
    printerType.list.fetching

  const errors = _.concat(
    order.list.errors,
    material.list.errors,
    order.list.errors,
    print.list.errors,
    printer.list.errors,
    run.post.errors,
    model.list.errors,
    printerType.list.errors
  )

  const orders = Selectors.getOrdersForRunNew(state)
  const prints = _.flatMap(orders, 'prints')
  const printers = Selectors.getPrintersForRunNew(state)

  return {
    orders,
    printers,
    prints,
    fetching,
    loading     : (!orders.length || !printers.length) && fetching,
    errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunContainer)
