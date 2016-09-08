import _                        from "lodash"
import React, { Component }     from "react"
import Actions                  from 'rapidfab/actions'
import { connect }              from 'react-redux'
import LocationsComponent       from 'rapidfab/components/inventory/locations'


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
    location,
    users
  } = state;

  return {
    locations : _.omit(location, ['uxFetching', 'uxErrors']),
    users     : _.omit(users, ['uxFetching', 'uxErrors']),
    fetching  : location.uxFetching || users.uxFetching,
    apiErrors : _.concat(location.uxErrors, users.uxErrors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer)
