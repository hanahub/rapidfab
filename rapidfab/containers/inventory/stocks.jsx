import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import StocksComponent from 'rapidfab/components/inventory/stocks';
import * as Selectors from 'rapidfab/selectors';

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

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      dispatch(Actions.Api.wyatt.material.list({ bureau }));
      dispatch(Actions.Api.wyatt.location.list());
      dispatch(Actions.Api.wyatt.stock.list());
    },
  };
}

function mapStateToProps(state) {
  const materialApi = state.ui.wyatt.material.list;
  const locationApi = state.ui.wyatt.location.list;
  const stockApi = state.ui.wyatt.stock.list;
  const fetching =
    materialApi.count === 0 ||
    (materialApi.count === 1 && materialApi.fetching) ||
    (locationApi.count === 0 ||
      (locationApi.count === 1 && locationApi.fetching)) ||
    (stockApi.count === 0 || (stockApi.count === 1 && stockApi.fetching));

  return {
    bureau: Selectors.getBureauUri(state),
    fetching,
    materials: Selectors.getMaterials(state),
    locations: Selectors.getLocations(state),
    stocks: Selectors.getStocks(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
