import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import PrintQueueComponent              from 'rapidfab/components/plan/printQueue'
import FakeData                         from 'rapidfab/fakeData';


const PrintQueueContainer = props => (
  <PrintQueueComponent {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrintQueueContainer)
