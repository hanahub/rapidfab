import React, { Component, PropTypes }   from 'react'
import Actions                           from 'rapidfab/actions'
import { connect }                       from 'react-redux'
import DashboardComponent                from 'rapidfab/components/admin/Dashboard'
import * as Selectors                    from 'rapidfab/selectors'

class DashboardContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props)
  }
  render() {
    return <DashboardComponent {...this.props} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (props) => {
      dispatch(Actions.Api.wyatt.feature.list())
      dispatch(Actions.Api.wyatt.location.list())

      if( props.bureau.group){
        dispatch(Actions.Api.pao.users.list({ 'group': props.bureau.group }))
      }
      if(props.user.uuid) {
        dispatch(Actions.Api.pao.users.get(props.user.uuid))
      }
    },
    onSaveFeature: payload => {
      if(payload) {
        dispatch(Actions.Api.wyatt.feature.post(payload))
      }
    },
    onSaveUser: payload => {
      const bureau = payload.bureau
      delete payload.bureau
      if(payload.uuid) {
        dispatch(Actions.Api.pao.users.put(payload.uuid, payload))
      } else {
        dispatch(Actions.Api.pao.users.post(payload)).then(args => {
          dispatch(Actions.Api.wyatt['membership-bureau'].post({
            user    : args.headers.location,
            bureau  : bureau,
          }))
        })
      }
    },
    onDeleteUser: payload => {
      if(payload) {
        dispatch(Actions.Api.wyatt['membership-bureau'].list({'user': userURI, 'bureau' : bureaus[0].uri}))
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
    permissions   : Selectors.getPermissions(state),
    features      : Selectors.getFeatures(state),
    users         : Selectors.getUsers(state),
    fetching      : feature.list.fetching,
    apiErrors     : feature.list.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
