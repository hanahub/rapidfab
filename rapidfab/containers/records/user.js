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
  'bureau',
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
      dispatch(Actions.Api.wyatt['membership-bureau'].list({'user': userURI, 'bureau' : Config.BUREAU}))
        .then(response => {
            if(response && response.json && response.json.resources && response.json.resources.length) {
              // for some reason we get back all memberships, not just for the user we are searching for
              const membership = _.find(response.json.resources, resource => { return resource.user == userURI });
              const uuid = extractUuid(membership.uri);
              dispatch(Actions.Api.wyatt['membership-bureau'].delete(uuid)).then(() => {
                dispatch(Actions.Api.pao.users.remove(extractUuid(membership.user)));
                redirect();
              });
            } else {
              console.error("We shouldn't hit this point, it means the user is in the list but not part of the bureau's group");
            }
        })
    }
  }
}

function mapStateToProps(state, props) {
  const initialValues = Selectors.getRouteResource(state, props)
  if(initialValues && initialValues.emails && initialValues.emails.length > 0) {
    initialValues.email = initialValues.emails[0];
  }
  return {
    uuid            : Selectors.getRoute(state, props).uuid,
    initialValues   : initialValues,
    submitting      : Selectors.getResourceFetching(state, "pao.users"),
    bureaus         : Selectors.getBureaus(state, props),
    apiErrors       : _.concat(
      Selectors.getResourceErrors(state, "pao.users"),
      Selectors.getResourceErrors(state, "pao.memberships"),
      Selectors.getResourceErrors(state, "wyatt.membership-bureau")
    ),
  }
}

export default reduxForm({
  form: 'record.users',
  fields
}, mapStateToProps, mapDispatchToProps)(UserContainer)
