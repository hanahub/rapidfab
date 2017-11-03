import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import ThirdPartyProvidersComponent from 'rapidfab/components/inventory/thirdPartyProviders';
import * as Selectors from 'rapidfab/selectors';

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

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      dispatch(Actions.Api.wyatt['third-party'].list({ bureau }));
    },
  };
}

function mapStateToProps(state) {
  const thirdPartyProviders = state.ui.wyatt['third-party'];

  return {
    bureau: Selectors.getBureauUri(state),
    providers: Selectors.getThirdPartyProviders(state),
    fetching: thirdPartyProviders.list.fetching,
    errors: thirdPartyProviders.list.errors,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ThirdPartyProvidersContainer
);
