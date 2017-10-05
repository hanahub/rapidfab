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
      dispatch(Actions.Api.wyatt.role.list());
    },
    onSaveFeature: payload => {
      if (payload) {
        dispatch(Actions.Api.wyatt.feature.post(payload));
      }
    },
    onCreateUser: (bureau, name, email, role, location) => {
      const payload = {
        bureau: bureau.uri,
        location: role == 'location-user' ? location : null,
        role: role,
        username: email,
      }
      dispatch(Actions.Api.wyatt.role.post(payload)).then(() => {
        dispatch(Actions.Api.wyatt.role.list({}, true));
      });
    },
    onUpdateUser: (role, newRole, location, userName) => {
      let roleUpdate = new Promise((resolve, reject) => {resolve()});
      if(newRole || location) {
        let rolePayload = {
          location  : location || role.location,
          role      : newRole || role.role,
        }
        if(rolePayload.role != "location-user") {
          rolePayload.location = null;
        }
        roleUpdate = dispatch(Actions.Api.wyatt.role.put(role.uuid, rolePayload));
      }
      let userUpdate = null;
      if(userName) {
        userUpdate = new Promise((resolve, reject) => {
          dispatch(Actions.Api.pao.users.list({ username: role.username })).then(response => {
            const userPayload = {
              name  : userName,
            }
            const userUUID = response.json.resources[0].uuid;
            userUpdate = dispatch(Actions.Api.pao.users.put(userUUID, userPayload)).then(() => {
              resolve()
            });
          });
        })
      } else {
        userUpdate = new Promise((resolve, reject) => {resolve()});
      }
      Promise.all([roleUpdate, userUpdate]).then(() => {
        dispatch(Actions.Api.wyatt.role.list({}, true));
      });
    },
    onDeleteUser: (bureau, role) => {
      dispatch(
        Actions.Api.wyatt.role.delete(role.uuid)
      ).then(response => {
        redirect();
      });
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
