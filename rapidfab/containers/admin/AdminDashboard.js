import React, { Component, PropTypes }   from 'react'
import Actions                           from 'rapidfab/actions'
import { connect }                       from 'react-redux'
import DashboardComponent                from 'rapidfab/components/admin/Dashboard'
import * as Selectors                    from 'rapidfab/selectors'

class DashboardContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.bureau.group)
  }
  render() {
    return <DashboardComponent {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (bureauGroup) => {
      dispatch(Actions.Api.wyatt.feature.list())
      if(bureauGroup){
        dispatch(Actions.Api.pao.users.list({ 'group': bureauGroup }))
      }
      dispatch(Actions.Api.wyatt.location.list())
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
    locations     : Selectors.getLocations(state),
    user          : Selectors.getSession(state),
    bureau        : Selectors.getBureau(state),
    features      : Selectors.getFeatures(state),
    users         : Selectors.getUsers(state),
    fetching      : feature.list.fetching,
    apiErrors     : feature.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
