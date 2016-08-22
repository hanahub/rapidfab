import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import PrintQueuesComponent             from 'rapidfab/components/plan/printQueues'
import FakeData                         from 'rapidfab/fakeData';


const PrintQueuesContainer = props => (
  <PrintQueuesComponent {...props}/>
)

function mapDispatchToProps(dispatch) {
  return {
  }
}

function mapStateToProps(state) {
  const {
  } = state;

  return {
    records: FakeData.print_queue
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintQueuesContainer)
