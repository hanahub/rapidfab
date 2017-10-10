import _ from 'lodash';
import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

import Permissions from 'rapidfab/permissions';
import ShowMaybe from 'rapidfab/components/showMaybe';
import { extractUuid } from 'rapidfab/reducers/makeApiReducers';

import AddFeature from './AddFeature';

class Features extends Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(updatedFeature) {
    const feature = {
      uuid: updatedFeature.uuid,
      enabled: !updatedFeature.enabled,
    };
    this.props.updateFeature(feature);
  }

  shouldShowAdminFeatures() {
  return Permissions.has('wyatt', 'feature.all', this.props);
}

render() {
  const { bureau, features, user } = this.props;
  return (
    <BS.Grid fluid>
      <BS.PageHeader>Admin Features</BS.PageHeader>
        <div
          style={{
            borderLeft: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
            borderRight: '1px solid #ddd',
          }}
        >
          <BS.Row>
            <BS.ButtonToolbar className="pull-right">
              <AddFeature {...this.props} />
            </BS.ButtonToolbar>
          </BS.Row>

          <BS.Table responsive striped hover>
            <tbody>
              { features.map((feature, index) => (
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
              ))}
            </tbody>
          </BS.Table>
        </div>
      </BS.Grid>
    );
  }
}

export default Features;
