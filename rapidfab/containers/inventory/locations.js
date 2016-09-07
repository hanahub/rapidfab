import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import LocationsComponent       from 'rapidfab/components/inventory/locations'
import * as Selectors           from 'rapidfab/selectors'

class LocationsContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <LocationsComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.pao.users.list())
      dispatch(Actions.Api.wyatt.location.list())
    }
  }
}

function mapStateToProps(state) {
  const {
    location
  } = state.ui.wyatt

  return {
    locations : Selectors.getLocations(state),
    users     : Selectors.getUsers(state),
    fetching  : location.list.fetching,
    apiErrors : location.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer)
