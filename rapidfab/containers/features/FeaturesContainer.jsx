import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';

import * as Selectors from 'rapidfab/selectors';

class FeaturesContainer extends Component {
  componentDidMount() {
    this.props.onInitialize();
  }
  render() {
    return <p>Features Container</p>;
  }
}

const mapDispatchToProps = dispatch => ({
  onInitialize: () => {
    dispatch(Actions.Api.wyatt.feature.list());
    dispatch(Actions.Api.wyatt.location.list());
    dispatch(Actions.Api.wyatt.role.list());
  },
  onSaveFeature: payload => {
    if (payload) {
      dispatch(Actions.Api.wyatt.feature.post(payload));
    }
  },
  updateFeature: payload => {
    if (payload) {
      dispatch(Actions.Api.wyatt.feature.put(payload.uuid, payload));
    }
  },
});

const mapStateToProps = state => ({
  bureau: Selectors.getBureau(state),
  features: Selectors.getFeatures(state),
  permissions: Selectors.getPermissions(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesContainer);
