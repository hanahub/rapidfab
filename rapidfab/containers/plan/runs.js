import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunsComponent                    from 'rapidfab/components/plan/runs'
import * as Selectors                   from 'rapidfab/selectors'


const RunsContainer = props => (
  <RunsComponent {...props}/>
)

function mapDispatchToProps(dispatch) {
  return {
  }
}

function mapStateToProps(state) {
  const {
    run
  } = state.ui.wyatt

  return {
    runs: Selectors.getRuns(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunsContainer)
