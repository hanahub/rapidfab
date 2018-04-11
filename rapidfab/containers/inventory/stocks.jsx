import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import StocksComponent from 'rapidfab/components/inventory/stocks';

class StocksContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.bureau);
  }

  render() {
    return <StocksComponent {...this.props} />;
  }
}

StocksContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  onInitialize: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onInitialize: bureau => {
    dispatch(Actions.Api.wyatt.material.list({ bureau }));
    dispatch(Actions.Api.wyatt.location.list());
    dispatch(Actions.Api.wyatt.stock.list());
  },
});

const mapStateToProps = state => ({
  bureau: Selectors.getBureauUri(state),
  fetching: isFetchingInitial(
    state.ui.wyatt.material.list,
    state.ui.wyatt.location.list,
    state.ui.wyatt.stock.list
  ),
  locations: Selectors.getLocationsByUri(state),
  materials: Selectors.getMaterialsByUri(state),
  stocks: Selectors.getStocks(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
