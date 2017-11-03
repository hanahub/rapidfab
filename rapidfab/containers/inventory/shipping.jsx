import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import ShippingsComponent from 'rapidfab/components/inventory/shipping';
import * as Selectors from 'rapidfab/selectors';

class ShippingsContainer extends Component {
  componentWillMount() {
    const { bureau, dispatch } = this.props;
    dispatch(Actions.Api.wyatt.shipping.list({ bureau: bureau.uri }));
  }

  render() {
    return <ShippingsComponent {...this.props} />;
  }
}

ShippingsContainer.propTypes = {
  bureau: PropTypes.object.isRequired,
  onInitialize: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { shipping } = state.ui.wyatt;

  return {
    bureau: Selectors.getBureau(state),
    locations: Selectors.getLocations(state),
    shippings: Selectors.getShippings(state),
    users: Selectors.getUsers(state),
    fetching: shipping.list.fetching,
    apiErrors: shipping.list.errors,
  };
}

export default connect(mapStateToProps)(ShippingsContainer);
