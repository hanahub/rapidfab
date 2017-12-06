import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import ThirdPartyProvidersComponent from 'rapidfab/components/inventory/thirdPartyProviders';

class ThirdPartyProvidersContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props.bureau);
  }

  render() {
    return <ThirdPartyProvidersComponent {...this.props} />;
  }
}

ThirdPartyProvidersContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  onInitialize: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onInitialize: bureau => {
    dispatch(Actions.Api.wyatt['third-party'].list({ bureau }));
  },
});

const mapStateToProps = state => ({
  bureau: Selectors.getBureauUri(state),
  fetching: isFetchingInitial(state.ui.wyatt['third-party'].list),
  providers: Selectors.getThirdPartyProviders(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ThirdPartyProvidersContainer
);
