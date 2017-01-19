import React, { Component, PropTypes }    from "react"
import { connect }                        from 'react-redux'
import _                                  from "lodash"
import Config                             from "rapidfab/config"
import Actions                            from "rapidfab/actions"
import UserComponent                      from 'rapidfab/components/records/user'
import { reduxForm }                      from 'redux-form'
import { extractUuid }                    from 'rapidfab/reducers/makeApiReducers'
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

function redirect() {
  window.location.hash = "#/inventory/users"
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
        dispatch(Actions.Api.pao.users.put(payload.uuid, payload)).then(redirect)
      } else {
        payload.login = false
        dispatch(Actions.Api.pao.users.post(payload)).then(args => {
          dispatch(Actions.Api.wyatt['membership-bureau'].post({
            user    : args.headers.location,
            bureau  : Config.BUREAU,
          })).then(redirect)
        })
      }
    },
    onDelete: userURI => {
      dispatch(Actions.Api.pao.memberships.list({'user': userURI, 'group' : Config.GROUP}))
        .then(response => {
            if(response && response.json && response.json.resources && response.json.resources.length) {
              const membership = response.json.resources[0];
              const uuid = extractUuid(membership.uri);
              dispatch(Actions.Api.pao.memberships.delete(uuid)).then(
                () => window.location.hash = "#/inventory/users"
              );
            } else {
              console.error("We shouldn't hit this point, it means the user is in the list but not part of the bureau's group");
            }
        })
    }
  }
}

function mapStateToProps(state, props) {
  const initialValues = Selectors.getRouteResource(state, props)
  if(initialValues.emails.length > 0) {
    initialValues.email = initialValues.emails[0].email || null;
  }
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : initialValues,
    submitting      : Selectors.getResourceFetching(state, "pao.users"),
    apiErrors       : _.concat(
      Selectors.getResourceErrors(state, "pao.users"),
      Selectors.getResourceErrors(state, "pao.memberships")
    )
  }
}

export default reduxForm({
  form: 'record.users',
  fields
}, mapStateToProps, mapDispatchToProps)(UserContainer)
