import _ from 'lodash';
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
  const printerType = state.ui.wyatt['printer-type'];
  const { manufacturer } = state.ui.wyatt;

  return {
    manufacturers: Selectors.getManufacturers(state),
    printerTypes: Selectors.getPrinterTypes(state),
    fetching: manufacturer.list.fetching || printerType.list.fetching,
    apiErrors: _.concat(manufacturer.list.errors, printerType.list.errors),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PrinterTypesContainer
);
