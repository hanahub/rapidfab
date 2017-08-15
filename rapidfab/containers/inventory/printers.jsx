import _ from 'lodash';
import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import PrintersComponent from 'rapidfab/components/inventory/printers';
import * as Selectors from 'rapidfab/selectors';


class PrintersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize();
  }

  render() {
    return <PrintersComponent {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt['printer-type'].list());
      dispatch(Actions.Api.wyatt.printer.list());
      dispatch(Actions.Api.wyatt.location.list());
      dispatch(Actions.Api.nautilus.modeler.list());
    },
  };
}

function mapStateToProps(state) {
  const printerType = state.ui.wyatt['printer-type'];
  const {
    printer,
  } = state.ui.wyatt;

  return {
    printers: Selectors.getPrinters(state),
    locations: Selectors.getLocations(state),
    printerTypes: Selectors.getPrinterTypes(state),
    modelers: Selectors.getModelers(state),
    fetching: printer.list.fetching || printerType.list.fetching,
    apiErrors: _.concat(printer.list.errors, printerType.list.errors),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintersContainer);
