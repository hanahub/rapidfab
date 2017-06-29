import React, { Component, PropTypes }   from 'react'
import Actions                           from 'rapidfab/actions'
import { connect }                       from 'react-redux'
import DashboardComponent                from 'rapidfab/components/admin/Dashboard'
import * as Selectors                    from 'rapidfab/selectors'
 
class DashboardContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }
  render() {
    return <DashboardComponent {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.feature.list())
    },
    onSaveFeature: payload => {
      if(payload) {
        dispatch(Actions.Api.wyatt.feature.post(payload))
      }
    },
    updateFeature: payload => {
      if(payload) {
        dispatch(Actions.Api.wyatt.feature.put(payload.uuid, payload))
      }
    }
  }
}

function mapStateToProps(state) {
  const feature = state.ui.wyatt.feature;

  return {
    user          : Selectors.getSession(state),
    bureau        : Selectors.getBureau(state),
    features      : Selectors.getFeature(state),
    fetching      : feature.list.fetching,
    apiErrors     : feature.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
