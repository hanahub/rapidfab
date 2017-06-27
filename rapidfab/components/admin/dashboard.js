import React, { Component, PropTypes } from 'react'
import * as BS                         from 'react-bootstrap'
import Error                           from 'rapidfab/components/error'
import Fa                              from 'react-fontawesome'
import Toggle                          from 'react-bootstrap-toggle'
import NewFeature                      from './AddFeature'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { toggleActive: true };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  render() {
    const { features } = this.props;
    const FeatureTable = () => {
      const feature = this.props.features.map((feature, index) => (
          <tr>
            <td>
              <span className="glyphicon glyphicon-file"></span>
              {feature.name} - {feature.description}
            </td>
            <td className="text-right text-nowrap">
              <Toggle
                onClick={this.onToggle}
                on={<div>ON</div>}
                off={<div>OFF</div>}
                size="sm"
                offstyle="primary"
                active={feature.enabled ? this.state.toggleActive : !this.state.toggleActive}
              />
            </td>
          </tr>
        ))
        return (<tbody>{feature}</tbody>)
    }

    return (
      <BS.Grid fluid>
        <BS.PageHeader>Admin Dashboard <small>features</small></BS.PageHeader>
        <div className="container">
          <BS.Row>
            <BS.ButtonToolbar className="pull-right">
              <NewFeature {...this.props} />
            </BS.ButtonToolbar>
          </BS.Row>
          <br />
          <div className="panel panel-default">
          <BS.Table responsive className="table table-hover">
            <FeatureTable {...this.props} onToggle={this.onToggle}/>
          </BS.Table>
          </div>
        </div>
      </BS.Grid>
    )
  }
}


export default Dashboard
