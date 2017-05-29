import _                                from "lodash"
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunComponent                     from 'rapidfab/components/records/run/new'
import * as Selectors                   from 'rapidfab/selectors'
import Fa                               from 'react-fontawesome'
import * as BS                          from 'react-bootstrap'
import { extractUuid }                  from 'rapidfab/reducers/makeApiReducers'

const printsPerPage = 10

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
  componentWillUnmount() {
    this.props.onUnmount()
  }

  render() {
    return this.props.loading ? <Loading/> : <RunComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.order.list()).then(response => {
        const printableOrders = _.filter(response.json.resources, order => {
          if(_.includes(["confirmed", "printing"], order.status))
            return order
        })
        for(let orders of _.chunk(printableOrders, 15)) {
          dispatch(Actions.Api.wyatt.print.list({
            order: _.map(orders, 'uri')
          }))
          dispatch(Actions.Api.hoth.model.list({
            uri: _.map(orders, 'model')
          }))
        }
      })
      dispatch(Actions.Api.wyatt["process-step"].list())
      dispatch(Actions.Api.wyatt['printer-type'].list())
      dispatch(Actions.Api.wyatt.printer.list())
      dispatch(Actions.Api.wyatt.material.list())
      dispatch(Actions.Api.nautilus.modeler.list())
    },
    onSave: payload => dispatch(Actions.Api.wyatt.run.post(payload)).then(args => {
      window.location.hash = `#/records/run/${extractUuid(args.headers.location)}`;
    }).catch((error) => {
      console.error("Failed to POST run", error);
    }),
    onPageChange: value => dispatch(Actions.Pager.setPage(value)),
    onUnmount: () => {
      dispatch(Actions.UI.clearUIState([
        "wyatt.run.post",
        "wyatt.run.put",
      ]))
    },
  }
}

const getPager = (state, prints) => ({
  items      : Math.ceil(prints.length / printsPerPage),
  activePage : state.pager.activePage,
})

function mapStateToProps(state) {
  const printerType = state.ui.wyatt['printer-type']
  const {
    order,
    material,
    print,
    printer,
    run
  } = state.ui.wyatt
  const processStep = state.ui.wyatt["process-step"]

  const {
    model
  } = state.ui.hoth

  const {
    modeler
  } = state.ui.nautilus

  const fetching =
    order.list.fetching ||
    material.list.fetching ||
    print.list.fetching ||
    printer.list.fetching ||
    model.list.fetching ||
    modeler.list.fetching ||
    run.post.fetching ||
    printerType.list.fetching ||
    processStep.list.fetching

  const apiErrors = _.concat(
    order.list.errors,
    material.list.errors,
    order.list.errors,
    print.list.errors,
    printer.list.errors,
    run.post.errors,
    model.list.errors,
    modeler.list.errors,
    printerType.list.errors,
    processStep.list.errors,
  )

  const orders = Selectors.getOrdersForRunNew(state)
  const prints = _.flatMap(orders, 'prints')
  const processSteps = Selectors.getProcessSteps(state)
  const printerTypes = Selectors.getPrinterTypes(state)

  const printablePrints = _.filter(prints, print => {
    if(!print.process_step) {
      return
    }
    const step = _.find(processSteps, step => (print.process_step == step.uri))

    if(_.find(printerTypes, type => (type.uri == step.process_type_uri))) {
      return print
    }
  })

  const pager = getPager(state, printablePrints)
  const printers = Selectors.getPrintersForRunNew(state)
  const modelers = Selectors.getModelers(state)

  const page = pager.activePage - 1

  return {
    apiErrors,
    fetching,
    loading     : (!orders.length || !printers.length) && fetching,
    orders,
    pager,
    printers,
    prints      : printablePrints.splice(page * printsPerPage, printsPerPage),
    modelers,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunContainer)
