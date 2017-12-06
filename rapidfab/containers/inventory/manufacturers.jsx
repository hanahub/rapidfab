import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';

import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import ManufacturersComponent from 'rapidfab/components/inventory/manufacturers';

class ManufacturersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize();
  }

  render() {
    return <ManufacturersComponent {...this.props} />;
  }
}

ManufacturersContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onInitialize: () => dispatch(Actions.Api.wyatt.manufacturer.list()),
});

const mapStateToProps = state => ({
  locations: Selectors.getLocations(state),
  manufacturers: Selectors.getManufacturers(state),
  users: Selectors.getUsers(state),
  fetching: isFetchingInitial(state.ui.wyatt.manufacturer.list),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ManufacturersContainer
);
