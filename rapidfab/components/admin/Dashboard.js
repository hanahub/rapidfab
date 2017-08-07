import React, { Component, PropTypes } from 'react';
import * as BS from 'react-bootstrap';
import Error from 'rapidfab/components/error';
import Fa from 'react-fontawesome';
import Toggle from 'react-bootstrap-toggle';
import NewFeature from './AddFeature';
import AddUser from './AddUser';
import ModifyUser from './ModifyUser';
import Permissions from 'rapidfab/permissions';
import ShowMaybe from 'rapidfab/components/showMaybe';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { features } = props;
    this.state = { selectedKey: 2, features };
    this.onToggle = this.onToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  onToggle(updatedFeature, updatedFeatureIndex) {
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

  openUserModal(user) {
    console.log(user);
  }

  render() {
    const { features, users, locations } = this.props;
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
      return (<tbody>{feature}</tbody>);
    };
    const UserTable = () => {
      const user = users.map((user_detail, index) => (
        <tr key={index}>
          <td>
            {user_detail.name}
          </td>
          <td>
            { Array.isArray(user_detail.emails) ? user_detail.emails[0] : user_detail.emails }
          </td>
          <td>
            {locations[0] ? locations[0].name : null}
          </td>
          <td>
              Manager
          </td>
          <td>
            <ModifyUser modifyUser={user_detail} locations={locations} bureau={this.props.bureau} {...this.props} />
          </td>
        </tr>
      ));
      return (<tbody>{user}</tbody>);
    };

    return (
      <BS.Grid fluid>
        <BS.PageHeader>Admin Dashboard</BS.PageHeader>
        <div>
          <BS.Nav bsStyle="tabs" justified activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
            {
              this.shouldShowAdminFeatures() ?
                <BS.NavItem eventKey={1} href="/">Features</BS.NavItem> :
                null
            }
            <BS.NavItem eventKey={2} href="/admin/manage">Manage Users</BS.NavItem>
          </BS.Nav>

          <BS.Nav activeKey={this.state.selectedKey} style={{ 'border-left': '1px solid #ddd', 'border-bottom': '1px solid #ddd', 'border-right': '1px solid #ddd' }}>
            <br />
            {this.state.selectedKey == 1 ? (
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
                      <th>Location</th>
                      <th>Permissions</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <UserTable {...this.props} />
                </BS.Table>
              </div>
            )}
          </BS.Nav>
        </div>
      </BS.Grid>
    );
  }
}


export default Dashboard;
