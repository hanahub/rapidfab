import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import ShippingsComponent from 'rapidfab/components/inventory/shipping';

class ShippingsContainer extends Component {
  componentWillMount() {
    const { bureau, dispatch } = this.props;
    dispatch(Actions.Api.wyatt.shipping.list({ bureau }));
  }

  render() {
    return <ShippingsComponent {...this.props} />;
  }
}

ShippingsContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bureau: Selectors.getBureauUri(state),
  locations: Selectors.getLocations(state),
  shippings: Selectors.getShippings(state),
  users: Selectors.getUsers(state),
  fetching: isFetchingInitial(state.ui.wyatt.shipping.list),
});

export default connect(mapStateToProps)(ShippingsContainer);
