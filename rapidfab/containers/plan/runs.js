import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunsComponent                    from 'rapidfab/components/plan/runs'
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
  } = state;

  return {
    records: FakeData.runs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunsContainer)
