import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Config                             from "rapidfab/config"
import Actions                            from "rapidfab/actions"
import UserComponent                      from 'rapidfab/components/records/user'
import { reduxForm }                      from 'redux-form'

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
        payload['login'] = false
        dispatch(Actions.Api.pao.users.post(payload)).then(
          args => dispatch(Actions.Api.pao.memberships.post({
            user  : args.headers.location,
            group : Config.GROUP
          }))
        )
      }
      window.location.hash = "#/inventory/users"
    },
    onDelete: uuid => {
      if(uuid) {
        dispatch(Actions.Api.pao.memberships.get({'user': uuid, 'group' : Config.GROUP}).then(
          args => dispatch(Actions.Api.pao.memberships.delete(args.uri)
        )))
        window.location.hash = "#/inventory/users"
      }
    }
  }
}

function mapStateToProps(state, props) {
  const {
    users
  } = state;

  return {
    uuid            : props.route.uuid,
    initialValues   : users[props.route.uuid],
  }
}

export default reduxForm({
  form: 'record.users',
  fields
}, mapStateToProps, mapDispatchToProps)(UserContainer)
