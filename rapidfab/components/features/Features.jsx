import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BS from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

import Permissions from 'rapidfab/permissions';

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
    const { features } = this.props;
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
              {features.map((feature, index) => (
                <tr key={feature.uri}>
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

Features.propTypes = {
  updateFeature: PropTypes.func.isRequired,
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Features;
