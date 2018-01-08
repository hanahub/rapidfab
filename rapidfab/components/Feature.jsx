import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import * as Selectors from 'rapidfab/selectors';

class Feature extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(Actions.Api.wyatt.feature.list());
  }

  render() {
    const { children, featureName, features } = this.props;
    const isFeatureEnabled = features.find(
      feature => feature.name === featureName && feature.enabled
    );
    return <div>{isFeatureEnabled ? <div>{children}</div> : null}</div>;
  }
}

Feature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  featureName: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const feature = state.ui.wyatt.feature;
  return {
    features: Selectors.getFeatures(state),
    fetching: feature.list.fetching,
    apiErrors: feature.list.errors,
  };
}

export default connect(mapStateToProps)(Feature);
