import _ from 'lodash';
import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

import Permissions from 'rapidfab/permissions';
import ShowMaybe from 'rapidfab/components/showMaybe';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import ModifyUser from './ModifyUser';

function hasManagerRole(bureau, roles, user) {
  if (!bureau) return false;
  for (const role of roles) {
    if (
      role.username == user.username &&
      role.bureau == bureau.uri &&
      role.role == 'manager'
    ) {
      return true;
    }
  }
  return false;
}

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      _.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state)
    );
  }

  render() {
    const { bureau, locations, roles, user } = this.props;
    const isManager = hasManagerRole(bureau, roles, user);
    const UserTable = ({ manager }) => {
      const locationByURI = locations.reduce((map, obj) => {
        map[obj.uri] = obj;
        return map;
      }, {});
      const LocationLink = ({ location }) => {
        if (!location) return null;
        const locationUUID = extractUuid(location.uri);
        const locationPath = `#/records/location/${locationUUID}`;
        return <a href={locationPath}>{location.name}</a>;
      };
      const role = roles.map((role_detail, index) => {
        const location = role_detail.location
          ? locationByURI[role_detail.location]
          : null;
        return (
          <tr key={index}>
            <td>{role_detail.name}</td>
            <td>
              {Array.isArray(role_detail.emails) ? (
                role_detail.emails[0]
              ) : (
                role_detail.emails
              )}
            </td>
            <td>{role_detail.role}</td>
            <td>
              <LocationLink location={location} />
            </td>
            <td>
              <ModifyUser
                bureau={this.props.bureau}
                enabled={manager}
                locations={locations}
                newUser={false}
                role={role_detail}
                {...this.props}
              />
            </td>
          </tr>
        );
      });
      return <tbody>{role}</tbody>;
    };

    return (
      <BS.Grid className="container" fluid>
        <BS.PageHeader>Manage Users</BS.PageHeader>
        <div className="clearfix">
          <BS.ButtonToolbar
            className="pull-right"
            style={{ paddingBottom: '2rem' }}
          >
            <ModifyUser
              newUser
              enabled={isManager}
              role={{}}
              {...this.props}
            />
          </BS.ButtonToolbar>
        </div>
        <BS.Table
          responsive
          striped
          bordered
          hover
          style={{ border: '1px solid #ddd' }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <UserTable manager={isManager} {...this.props} />
        </BS.Table>
      </BS.Grid>
    );
  }
}

export default Admin;
