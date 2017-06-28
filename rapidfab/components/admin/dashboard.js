import React, { Component, PropTypes } from 'react'
import * as BS                         from 'react-bootstrap'
import Error                           from 'rapidfab/components/error'
import Fa                              from 'react-fontawesome'
import Toggle                          from 'react-bootstrap-toggle'
import NewFeature                      from './AddFeature'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    const { features } = props;
    this.state = { features: features };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(updatedFeature, updatedFeatureIndex) {
    const { features } = this.state;
    const updatedFeatures = features.map((feature, index) => {
      if (index === updatedFeatureIndex) {
        return Object.assign({}, feature, { enabled: !feature.enabled});
      }
      else {
        return feature;
      }
      this.setState({ features: updatedFeatures });
    });
    debugger
    const feature = {
      uuid: updatedFeature.uuid,
      enabled: !updatedFeature.enabled
    }

    this.props.updateFeature(feature);
  }


  render() {
    const { features } = this.props;
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
            <FeatureTable {...this.props} />
          </BS.Table>
          </div>
        </div>
      </BS.Grid>
    )
  }
}


export default Dashboard
