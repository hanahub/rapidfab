import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunsComponent                    from 'rapidfab/components/records/run/new'
import FakeData                         from 'rapidfab/fakeData';


const RunsContainer = props => (
  <RunsComponent {...props}/>
)

function mapDispatchToProps(dispatch) {
  return {
  }
}

function mapStateToProps(state) {
  const {
    fakeData
  } = state

  const {
    print,
    printer,
    model,
    order
  } = fakeData

  return {
    prints: print,
    printers: printer,
    orders: order
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunsContainer)
