import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from 'rapidfab/actions';
import { isQuotingFeatureEnabled } from 'rapidfab/selectors';

import Quoting from 'rapidfab/components/quoting/Quoting';

class QuotingContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Actions.Api.wyatt.feature.list());
    dispatch(Actions.Api.aculeta.quote.list());
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.isQuotingFeatureEnabled) {
      window.location.hash = '';
    }
  }

  render() {
    return <Quoting {...this.props} />;
  }
}

QuotingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isQuotingFeatureEnabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(state => ({
  isQuotingFeatureEnabled: isQuotingFeatureEnabled(state),
  loading:
    state.ui.wyatt.feature.list.count > 0 ||
    state.ui.wyatt.feature.list.fetching,
}))(QuotingContainer);
