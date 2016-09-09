import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import RunsComponent                    from 'rapidfab/components/plan/runs'
import * as Selectors                   from 'rapidfab/selectors'


class RunsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize()
  }

  render() {
    return <RunsComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.poop.list())
    }
  }
}

function mapStateToProps(state) {
  const {
    run
  } = state.ui.wyatt

  return {
    runs      : Selectors.getRuns(state),
    fetching  : run.list.fetching,
    apiErrors : run.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunsContainer)
