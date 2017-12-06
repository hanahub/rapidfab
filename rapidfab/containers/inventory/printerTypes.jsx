import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import PrinterTypesComponent from 'rapidfab/components/inventory/printerTypes';

class PrinterTypesContainer extends Component {
  componentWillMount() {
    this.props.onInitialize();
  }

  render() {
    return <PrinterTypesComponent {...this.props} />;
  }
}

PrinterTypesContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onInitialize: () => {
    dispatch(Actions.Api.wyatt.manufacturer.list());
    dispatch(Actions.Api.wyatt['printer-type'].list());
  },
});

const mapStateToProps = state => ({
  fetching: isFetchingInitial(
    state.ui.wyatt.manufacturer.list,
    state.ui.wyatt['printer-type'].list
  ),
  manufacturers: Selectors.getManufacturers(state),
  printerTypes: Selectors.getPrinterTypes(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PrinterTypesContainer
);
