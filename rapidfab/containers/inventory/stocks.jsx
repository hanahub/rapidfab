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
  const { material, location, stock } = state.ui.wyatt;

  return {
    bureau: Selectors.getBureauUri(state),
    materials: Selectors.getMaterials(state),
    locations: Selectors.getLocations(state),
    stocks: Selectors.getStocks(state),
    fetching:
      material.list.fetching || location.list.fetching || stock.list.fetching,
    apiErrors: [
      ...material.list.errors,
      ...location.list.errors,
      ...stock.list.errors,
    ],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
