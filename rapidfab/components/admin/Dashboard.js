import React, { Component, PropTypes } from 'react'
import * as BS                         from 'react-bootstrap'
import Error                           from 'rapidfab/components/error'
import Fa                              from 'react-fontawesome'
import Toggle                          from 'react-bootstrap-toggle'
import NewFeature                      from './AddFeature'
import NewUser                         from './AddUser'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    const { features } = props;
    this.state = { features: features };
    this.state = { selectedKey: 2 };
    this.onToggle = this.onToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  onToggle(updatedFeature, updatedFeatureIndex) {
    const feature = {
      uuid: updatedFeature.uuid,
      enabled: !updatedFeature.enabled
    }
    this.props.updateFeature(feature);
  }

  handleSelect(selectedKey) {
    this.setState({ selectedKey: selectedKey });
  }

  render() {
    const { features, users, locations } = this.props;
    const FeatureTable = () => {
      const feature = features.map((feature, index) => (
          <tr key={index}>
            <td>
              <span className="glyphicon glyphicon-file"></span>
               {feature.name} - {feature.description}
            </td>
            <td className="text-right text-nowrap">
              <Toggle
                onClick={ () => this.onToggle(feature, index) }
                on={ <div>ON</div> }
                off={ <div>OFF</div> }
                size="sm"
                offstyle="primary"
                active={ feature.enabled }
              />
            </td>
          </tr>
        ))
        return (<tbody>{feature}</tbody>)
    }
    const UserTable = () => {
      const user = users.map((user, index) => (
          <tr key={index}>
            <td>
              {user.name}
            </td>
            <td>
              {user.emails[0]}
            </td>
            <td>
              {locations[0] ? locations[0].name: null}
            </td>
            <td>
              test 2
            </td>
          </tr>
        ))
        return (<tbody>{user}</tbody>)
    }

    return (
      <BS.Grid fluid>
        <BS.PageHeader>Admin Dashboard</BS.PageHeader>
        <div>
          <BS.Nav bsStyle="tabs" justified activeKey={this.state.selectedKey} onSelect={this.handleSelect}>
            <BS.NavItem eventKey={1} href="/">Features</BS.NavItem>
            <BS.NavItem eventKey={2} href="/admin/manage">Manage Users</BS.NavItem>
          </BS.Nav>

          <BS.Nav activeKey={this.state.selectedKey} style={{"border-left": "1px solid #ddd", "border-bottom": "1px solid #ddd", "border-right": "1px solid #ddd" }}>
            <br />
            {this.state.selectedKey == 1 ? (
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
              ) : (
                <div>
                  <div className="container">
                    <BS.Row>
                      <BS.ButtonToolbar className="pull-right">
                        <NewUser {...this.props} />
                      </BS.ButtonToolbar>
                    </BS.Row>
                    <br />
                  </div>

                  <BS.Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Permissions</th>
                      </tr>
                    </thead>
                    <UserTable {...this.props} />
                  </BS.Table>
                </div>
            )}
          </BS.Nav>
        </div>
      </BS.Grid>
    )
  }
}


export default Dashboard
