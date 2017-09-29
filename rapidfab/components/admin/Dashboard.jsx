import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

import Permissions from 'rapidfab/permissions';
import ShowMaybe from 'rapidfab/components/showMaybe';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import NewFeature from './AddFeature';
import AddUser from './AddUser';
import ModifyUser from './ModifyUser';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { features } = props;
    this.state = { selectedKey: 2, features };
    this.onToggle = this.onToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
    const { features, locations, roles } = this.props;
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
    const UserTable = () => {
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
                      <AddUser {...this.props} />
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
                  <UserTable {...this.props} />
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
