import _ from 'lodash';
import React, { Component } from 'react';
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

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      dispatch(Actions.Api.wyatt['third-party'].list({ bureau: bureau.uri }));
    },
  };
}

function mapStateToProps(state) {
  const third_party_providers = state.ui.wyatt['third-party'];

  return {
    bureau: Selectors.getBureau(state),
    providers: Selectors.getThirdPartyProviders(state),
    fetching: third_party_providers.list.fetching,
    errors: _.concat(third_party_providers.list.errors),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ThirdPartyProvidersContainer
);
