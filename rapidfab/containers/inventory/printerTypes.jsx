import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import PrinterTypesComponent from 'rapidfab/components/inventory/printerTypes';
import * as Selectors from 'rapidfab/selectors';

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

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.manufacturer.list());
      dispatch(Actions.Api.wyatt['printer-type'].list());
    },
  };
}

function mapStateToProps(state) {
  const manufacturerApi = state.ui.wyatt.manufacturer.list;
  const printerTypeApi = state.ui.wyatt['printer-type'].list;
  const fetching =
    manufacturerApi.count === 0 ||
    (manufacturerApi.count === 1 && manufacturerApi.fetching) ||
    (printerTypeApi.count === 0 ||
      (printerTypeApi.count === 1 && printerTypeApi.fetching));

  return {
    manufacturers: Selectors.getManufacturers(state),
    printerTypes: Selectors.getPrinterTypes(state),
    fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PrinterTypesContainer
);
