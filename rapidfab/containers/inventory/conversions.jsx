import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import ConversionsComponent from 'rapidfab/components/inventory/conversions';

class ConversionsContainer extends Component {
  componentDidMount() {
    const { bureau, dispatch } = this.props;
    dispatch(Actions.Api.wyatt['currency-conversion'].list({ bureau }));
  }

  render() {
    return <ConversionsComponent {...this.props} />;
  }
}

ConversionsContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bureau: Selectors.getBureauUri(state),
  conversions: Selectors.getConversions(state),
  fetching: isFetchingInitial(state.ui.wyatt['currency-conversion'].list),
  locations: Selectors.getLocations(state),
  users: Selectors.getUsers(state),
});

export default connect(mapStateToProps)(ConversionsContainer);
