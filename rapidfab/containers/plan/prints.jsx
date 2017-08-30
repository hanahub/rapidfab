import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';
import Gatekeeper from 'rapidfab/components/gatekeeper';
import PrintsComponent from 'rapidfab/components/plan/prints';

class PrintsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize();
  }

  render() {
    const {
      gridData,
      locations,
      fetching,
      apiErrors,
      handleOnChange,
    } = this.props;
    return (
      <Gatekeeper errors={apiErrors} loading={fetching}>
        <PrintsComponent
          gridData={gridData}
          locations={locations}
          handleOnChange={handleOnChange}
        />
      </Gatekeeper>
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
  const { print, location } = state.ui.wyatt;
  const orders = Selectors.getOrders(state);
  const allPrints = Selectors.getPrints(state);
  const printProcessSteps = Selectors.getProcessSteps(state).filter(step =>
    step.process_type_uri.includes('printer-type')
  );
  const prints = allPrints.filter(print =>
    printProcessSteps.some(step => step.uri === print.process_step)
  );
  const locationFilter = Selectors.getLocationFilter(state);
  const filteredPrints = prints.filter(print => {
    if (locationFilter) {
      return print.location === locationFilter.location;
    }
    return true;
  });

  const gridData = filteredPrints.map(print => {
    if (orders && prints) {
      const printOrder = orders.find(order => order.uri === print.order);
      const { id, order, status } = print;
      const { name } = printOrder;
      const dueDate = printOrder.due_date;
      const customerName = printOrder.customer_name;
      return { id, order, dueDate, name, customerName, status };
    }
    return {};
  });

  return {
    gridData,
    locations: Selectors.getLocations(state),
    fetching: print.list.fetching || location.list.fetching,
    apiErrors: print.list.errors || location.list.errors,
  };
}
PrintsContainer.propTypes = {
  apiErrors: PropTypes.array.isRequired,
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
