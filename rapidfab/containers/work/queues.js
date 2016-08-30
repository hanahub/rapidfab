import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import QueuesComponent                  from 'rapidfab/components/work/queues'
import FakeData                         from 'rapidfab/fakeData';


const QueuesContainer = props => (
  <QueuesComponent {...props}/>
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
    order,
    run
  } = fakeData

  return {
    runs: run
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuesContainer)
