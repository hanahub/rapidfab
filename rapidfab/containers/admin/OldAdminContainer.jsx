import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';

import * as Selectors from 'rapidfab/selectors';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import Admin from 'rapidfab/components/admin/Admin';

function redirect() {
  window.location.hash = '#/admin/dashboard';
}

class AdminContainer extends Component {
  componentDidMount() {
    this.props.onInitialize();
  }
  render() {
    return <Admin {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  onInitialize: () => {
    dispatch(Actions.Api.wyatt.location.list());
    dispatch(Actions.Api.wyatt.role.list());
  },
  onCreateUser: (bureau, name, email, role, location) => {
    const userPayload = {
      name,
      email,
      login: false,
    };
    const rolePayload = {
      bureau: bureau.uri,
      location: role == 'location-user' ? location : null,
      role,
      username: email,
    };
    dispatch(Actions.Api.pao.users.post(userPayload))
      .then(() => dispatch(Actions.Api.wyatt.role.post(rolePayload)))
      .then(() => dispatch(Actions.Api.wyatt.role.list({}, true)))
      .catch(e => {
        dispatch(Actions.Api.wyatt.role.post(rolePayload)).then(() =>
          dispatch(Actions.Api.wyatt.role.list({}, true))
        );
      });
  },
  onUpdateUser: (role, newRole, location, userName) => {
    let roleUpdate = new Promise((resolve, reject) => {
      resolve();
    });
    if (newRole || location) {
      const rolePayload = {
        location: location || role.location,
        role: newRole || role.role,
      };
      if (rolePayload.role != 'location-user') {
        rolePayload.location = null;
      }
      roleUpdate = dispatch(Actions.Api.wyatt.role.put(role.uuid, rolePayload));
    }
    let userUpdate = null;
    if (userName) {
      userUpdate = new Promise((resolve, reject) => {
        dispatch(
          Actions.Api.pao.users.list({ username: role.username })
        ).then(response => {
          const userPayload = {
            name: userName,
          };
          const userUUID = response.json.resources[0].uuid;
          userUpdate = dispatch(
            Actions.Api.pao.users.put(userUUID, userPayload)
          ).then(() => {
            resolve();
          });
        });
      });
    } else {
      userUpdate = new Promise((resolve, reject) => {
        resolve();
      });
    }
    Promise.all([roleUpdate, userUpdate]).then(() => {
      dispatch(Actions.Api.wyatt.role.list({}, true));
    });
  },
  onDeleteUser: (bureau, role) => {
    dispatch(Actions.Api.wyatt.role.delete(role.uuid)).then(response => {
      dispatch(Actions.Api.wyatt.role.list({}, true));
    });
  },
});

const mapStateToProps = state => ({
  bureau: Selectors.getBureau(state),
  locations: Selectors.getLocations(state),
  roles: Selectors.getRoles(state),
  user: Selectors.getSession(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
