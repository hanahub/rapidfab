import _ from 'lodash';
import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

import Permissions from 'rapidfab/permissions';
import ShowMaybe from 'rapidfab/components/showMaybe';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import NewFeature from './AddFeature';
import AddUser from './AddUser';
import ModifyUser from './ModifyUser';

function hasManagerRole(bureau, roles, user) {
  if(!bureau) return false;
  for(const role of roles) {
    if(role.username == user.username && role.bureau == bureau.uri && role.role == 'manager') {
      return true;
    }
  }
  return false;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { features } = props;
    this.state = { selectedKey: 2, features };
    this.onToggle = this.onToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state))
  }

  onToggle(updatedFeature) {
    const feature = {
      uuid: updatedFeature.uuid,
      enabled: !updatedFeature.enabled,
    };
    this.props.updateFeature(feature);
  }

  handleSelect(selectedKey) {
    this.setState({ selectedKey });
  }

  shouldShowAdminFeatures() {
    return Permissions.has('wyatt', 'feature.all', this.props);
  }

  render() {
    const { bureau, features, locations, roles, user } = this.props;
    const isManager = hasManagerRole(bureau, roles, user);
    const FeatureTable = () => {
      const feature = features.map((feature, index) => (
        <tr key={index}>
          <td>
            <span className="glyphicon glyphicon-file" />
            {feature.name} - {feature.description} - {feature.bureau}
          </td>
          <td className="text-right text-nowrap">
            <Toggle
              onClick={() => this.onToggle(feature, index)}
              on={<div>ON</div>}
              off={<div>OFF</div>}
              size="sm"
              offstyle="primary"
              active={feature.enabled}
            />
          </td>
        </tr>
      ));
      return <tbody>{feature}</tbody>;
    };
    const UserTable = ({manager}) => {
      const locationByURI = locations.reduce((map, obj) => {
        map[obj.uri] = obj;
        return map;
      }, {});
      const LocationLink = ({location}) => {
        if (!location)
          return null;
        const locationUUID = extractUuid(location.uri);
        const locationPath = `#/records/location/${locationUUID}`;
        return (
          <a href={locationPath}>
            {location.name}
          </a>
        )
      }
      const role = roles.map((role_detail, index) => {
        const location = role_detail.location ? locationByURI[role_detail.location] : null;
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
            <td><LocationLink location={location}/></td>
            <td>
              <ModifyUser
                bureau={this.props.bureau}
                enabled={manager}
                locations={locations}
                role={role_detail}
                {...this.props}
              />
            </td>
          </tr>
        )}
      );
      return <tbody>{role}</tbody>;
    };

    return (
      <BS.Grid fluid>
        <BS.PageHeader>Admin Dashboard</BS.PageHeader>
        <div>
          <BS.Nav
            bsStyle="tabs"
            justified
            activeKey={this.state.selectedKey}
            onSelect={this.handleSelect}
          >
            {this.shouldShowAdminFeatures() ? (
              <BS.NavItem eventKey={1} href="/">
                Features
              </BS.NavItem>
            ) : null}
            <BS.NavItem eventKey={2} href="/admin/manage">
              Manage Users
            </BS.NavItem>
          </BS.Nav>

          <div style={{
            'borderLeft': '1px solid #ddd',
            'borderBottom': '1px solid #ddd',
            'borderRight': '1px solid #ddd',
          }}>
            {this.state.selectedKey === 1 ? (
              <ShowMaybe showIf={this.shouldShowAdminFeatures()}>
                <div>
                  <div className="container">
                    <BS.Row>
                      <BS.ButtonToolbar className="pull-right">
                        <NewFeature {...this.props} />
                      </BS.ButtonToolbar>
                    </BS.Row>
                    <br />
                  </div>

                  <BS.Table responsive striped hover>
                    <FeatureTable {...this.props} />
                  </BS.Table>
                </div>
              </ShowMaybe>
            ) : (
              <div>
                <div className="container">
                  <BS.Row>
                    <BS.ButtonToolbar className="pull-right">
                      <AddUser enabled={isManager} {...this.props} />
                    </BS.ButtonToolbar>
                  </BS.Row>
                  <br />
                </div>

                <BS.Table responsive striped bordered hover>
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
              </div>
            )}
          </div>
        </div>
      </BS.Grid>
    );
  }
}

export default Dashboard;
