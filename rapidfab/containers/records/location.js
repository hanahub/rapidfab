import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Actions                            from "rapidfab/actions"
import LocationComponent                  from 'rapidfab/components/records/location'
import Config                             from 'rapidfab/config'
import { reduxForm }                      from 'redux-form'

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

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.pao.users.list())
      if(uuid) {
        dispatch(Actions.Api.wyatt.location.get(uuid))
      }
    },
    onSubmit: payload => {
      payload.bureau = Config['BUREAU']
      debugger;
      if(payload.uuid) {
        dispatch(Actions.Api.wyatt.location.put(payload.uuid, payload))
        window.location.hash = "#/inventory/locations"
      } else {
        dispatch(Actions.Api.wyatt.location.post(payload))
        window.location.hash = "#/inventory/locations"
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.wyatt.location.delete(uuid))
        window.location.hash = "#/inventory/locations"
      }
    }
  }
}

function mapStateToProps(state, props) {
  const {
    location,
    users
  } = state;

  return {
    uuid            : props.route.uuid,
    initialValues   : location[props.route.uuid],
    users           : _.omit(users, ['uxFetching', 'uxErrors']),
  }
}

export default reduxForm({
  form: 'record.location',
  fields
}, mapStateToProps, mapDispatchToProps)(LocationContainer)
