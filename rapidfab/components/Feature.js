import React, { Component } from 'react';
import Actions                           from 'rapidfab/actions'
import { connect }                       from 'react-redux'
import * as Selectors                    from 'rapidfab/selectors'

class Feature extends Component {

  componentWillMount() {
    const { props, props: { dispatch }} = this;
    dispatch(Actions.Api.wyatt.feature.list())
  }

  render() {
    const { children, featureName, features, bureau } = this.props;
    const isFeatureEnabled = features.find(feature => {
      if (feature.name == 'eos-order-fields' && bureau.uri == "https://erp.authentise.com/bureau/83c4d8cc-6358-465c-b653-c043b3ac52ad/"){
        return true
      }else {
        return feature.name === featureName && feature.enabled;
      }
    });
    return (
      <div>
        { isFeatureEnabled ?
            <div>{children}</div>
            : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const feature = state.ui.wyatt.feature;
  return {
    features      : Selectors.getFeatures(state),
    bureau        : Selectors.getBureau(state),
    fetching      : feature.list.fetching,
    apiErrors     : feature.list.errors
  }
}

export default connect(mapStateToProps)(Feature)
