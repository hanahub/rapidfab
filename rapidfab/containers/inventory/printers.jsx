import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import PrintersComponent from 'rapidfab/components/inventory/printers';

class PrintersContainer extends Component {
  componentWillMount() {
    this.props.onInitialize();
  }

  render() {
    return <PrintersComponent {...this.props} />;
  }
}

PrintersContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onInitialize: () => {
    dispatch(Actions.Api.nautilus.modeler.list());
    dispatch(Actions.Api.wyatt.location.list());
    dispatch(Actions.Api.wyatt.printer.list());
    dispatch(Actions.Api.wyatt['printer-type'].list());
  },
});

const mapStateToProps = state => ({
  fetching: isFetchingInitial(
    state.ui.nautilus.modeler.list,
    state.ui.wyatt.location.list,
    state.ui.wyatt.printer.list,
    state.ui.wyatt['printer-type'].list
  ),
  locations: Selectors.getLocationsByUri(state),
  modelers: Selectors.getModelersByUri(state),
  printers: Selectors.getPrinters(state),
  printerTypes: Selectors.getPrinterTypesByUri(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintersContainer);
