import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import {
  getLocationFilter,
  getLocations,
  getOrders,
  getPrints,
  getProcessSteps,
} from 'rapidfab/selectors';

import Prints from 'rapidfab/components/plan/prints';

class PrintsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize();
  }

  render() {
    const { fetching, gridData, locations, handleOnChange } = this.props;
    return (
      <Prints
        fetching={fetching}
        gridData={gridData}
        locations={locations}
        handleOnChange={handleOnChange}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.print.list());
      dispatch(Actions.Api.wyatt.order.list());
      dispatch(Actions.Api.wyatt['process-step'].list());
      dispatch(Actions.Api.wyatt.location.list());
    },
    handleOnChange: location => {
      dispatch(Actions.LocationFilter.setLocation(location));
    },
  };
}

function mapStateToProps(state) {
  const printApi = state.ui.wyatt.print.list;
  const orders = getOrders(state);
  const allPrints = getPrints(state);
  const printProcessSteps = getProcessSteps(state).filter(step =>
    step.process_type_uri.includes('printer-type')
  );
  const prints = allPrints.filter(print =>
    printProcessSteps.some(step => step.uri === print.process_step)
  );
  const locationFilter = getLocationFilter(state);
  const filteredPrints = prints.filter(print => {
    if (locationFilter) {
      return print.location === locationFilter.location;
    }
    return true;
  });

  const gridData = filteredPrints.map(print => {
    const printOrder = orders.find(order => order.uri === print.order);
    if (printOrder) {
      const { id, name, order, status, uuid } = print;

      const dueDate = printOrder.due_date;
      const customerName = printOrder.customer_name;
      return { id, order, dueDate, name, customerName, status, uuid };
    }
    return {};
  });

  return {
    fetching:
      printApi.count === 0 || (printApi.count === 1 && printApi.fetching),
    gridData,
    locations: getLocations(state),
  };
}
PrintsContainer.propTypes = {
  fetching: PropTypes.bool.isRequired,
  gridData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      name: PropTypes.string,
      customerName: PropTypes.string,
      dueDate: PropTypes.date,
    })
  ).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInitialize: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintsContainer);
