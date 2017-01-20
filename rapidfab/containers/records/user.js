import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Config                             from "rapidfab/config"
import Actions                            from "rapidfab/actions"
import UserComponent                      from 'rapidfab/components/records/user'
import { reduxForm }                      from 'redux-form'
import * as Selectors                     from 'rapidfab/selectors'

const fields = [
  'id',
  'uri',
  'uuid',
  'email',
  'name',
  'username',
]

class UserContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid)
  }

  render() {
    return <UserComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      if(uuid) {
        dispatch(Actions.Api.pao.users.get(uuid))
      }
    },
    onSubmit: payload => {
      if(payload.uuid) {
        dispatch(Actions.Api.pao.users.put(payload.uuid, payload))
      } else {
        payload.login = false
        dispatch(Actions.Api.pao.users.post(payload)).then(args => {
          dispatch(Actions.Api.pao.memberships.post({
            user  : args.headers.location,
            group : Config.GROUP
          })).then(() => window.location.hash = "#/inventory/users")
        })
      }
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.pao.memberships.get({'user': uuid, 'group' : Config.GROUP}))
          .then(args => dispatch(Actions.Api.pao.memberships.delete(args.uri)))
          .then(() => window.location.hash = "#/inventory/users")
      }
    }
  }
}

function mapStateToProps(state, props) {
  const initialValues = Selectors.getRouteResource(state, props)
  if(initialValues && initialValues.emails && initialValues.emails.length > 0) {
    initialValues.email = initialValues.emails[0].email;
  }
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : initialValues,
    submitting      : Selectors.getResourceFetching(state, "pao.users"),
    apiErrors       : Selectors.getResourceErrors(state, "pao.users")
  }
}

export default reduxForm({
  form: 'record.users',
  fields
}, mapStateToProps, mapDispatchToProps)(UserContainer)
