import React, { Component, PropTypes }  from "react"
import { connect }                      from 'react-redux'
import HomeComponent                    from 'rapidfab/components/home'
import Actions                          from 'rapidfab/actions'
import * as Selectors                   from 'rapidfab/selectors'

class HomeContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }
  render() {
    return <HomeComponent {...this.props} />
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.run.list())
    }
  }
}

function mapStateToProps(state) {
  const {
    run
  } = state.ui.wyatt

  return {
    fetching        : run.list.fetching,
    apiErrors       : run.list.errors,
    chartData       : {
      runStatus   : Selectors.getRunStatusChartData(state)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
