import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import LocationComponent                  from 'rapidfab/components/records/location'
import Config                             from 'rapidfab/config'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'phone',
  'address',
  'contact',
]


class LocationContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <LocationComponent {...this.props}/>
  }
}

function redirect() {
  window.location.hash = "#/inventory/locations"
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.pao.users.list({
        group: Config.GROUP
      }))
      if(uuid) {
        dispatch(Actions.Api.wyatt.location.get(uuid))
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.location.put(payload.uuid, payload)).then(redirect)
      } else {
        payload.bureau = Config.BUREAU
        dispatch(Actions.Api.wyatt.location.post(payload)).then(redirect)
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.location.delete(uuid)).then(redirect)
      }
    }
  }
}

function mapStateToProps(state, props) {
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : Selectors.getRouteResource(state, props),
    submitting      : Selectors.getResourceFetching(state, "wyatt.location"),
    apiErrors       : Selectors.getResourceErrors(state, "wyatt.location"),
    users           : Selectors.getUsers(state)
  }
}

export default reduxForm({
  form: 'record.location',
  fields
}, mapStateToProps, mapDispatchToProps)(LocationContainer)
