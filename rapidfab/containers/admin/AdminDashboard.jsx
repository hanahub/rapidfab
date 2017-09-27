import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import DashboardComponent from 'rapidfab/components/admin/Dashboard';
import * as Selectors from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

class DashboardContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props);
  }
  render() {
    return <DashboardComponent {...this.props} />;
  }
}

function redirect() {
  window.location.hash = '#/admin/dashboard';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: props => {
      dispatch(Actions.Api.wyatt.feature.list());
      dispatch(Actions.Api.wyatt.location.list());
      dispatch(Actions.Api.pao.permissions.list({ namespace: 'wyatt' }));
      if (props.bureau.group) {
        dispatch(Actions.Api.pao.users.list({ group: props.bureau.group }));
      }
      if (props.user.uuid) {
        dispatch(Actions.Api.pao.users.get(props.user.uuid));
      }
    },
    onSaveFeature: payload => {
      if (payload) {
        dispatch(Actions.Api.wyatt.feature.post(payload));
      }
    },
    onSaveUser: payload => {
      const bureau = payload.bureau;
      delete payload.bureau;
      if (payload.uuid) {
        dispatch(Actions.Api.pao.users.put(payload.uuid, payload));
        redirect();
      } else {
        dispatch(Actions.Api.pao.users.post(payload)).then(args => {
          dispatch(
            Actions.Api.wyatt['membership-bureau'].post({
              user: args.headers.location,
              bureau,
            })
          );
        });
        redirect();
      }
    },
    onDeleteUser: payload => {
      if (payload) {
        dispatch(
          Actions.Api.wyatt['membership-bureau'].list({
            user: payload.userURI,
            bureau: payload.bureau.uri,
          })
        ).then(response => {
          if (
            response &&
            response.json &&
            response.json.resources &&
            response.json.resources.length
          ) {
            // for some reason we get back all memberships, not just for the user we are searching for
            const membership = response.json.resources.find(
              resource => resource.user === payload.userURI
            );
            const uuid = extractUuid(membership.uri);
            dispatch(
              Actions.Api.wyatt['membership-bureau'].delete(uuid)
            ).then(() => {
              dispatch(
                Actions.Api.pao.users.remove(extractUuid(membership.user))
              );
              redirect();
            });
          } else {
            /* eslint-disable no-console */
            console.error(
              'This is the wrong bureau. Make sure you impersonate the manager of the bureau!'
            );
            /* eslint-enable no-console */
          }
        });
      }
    },
    updateFeature: payload => {
      if (payload) {
        dispatch(Actions.Api.wyatt.feature.put(payload.uuid, payload));
      }
    },
  };
}

function mapStateToProps(state) {
  const feature = state.ui.wyatt.feature;

  return {
    apiErrors   : feature.list.errors,
    bureau      : Selectors.getBureau(state),
    features    : Selectors.getFeatures(state),
    fetching    : feature.list.fetching,
    locations   : Selectors.getLocations(state),
    permissions : Selectors.getPermissions(state),
    roles       : Selectors.getRoles(state),
    user        : Selectors.getSession(state),
    users       : Selectors.getUsers(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
