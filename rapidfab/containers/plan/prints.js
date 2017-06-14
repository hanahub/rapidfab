import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from "lodash"

import Actions from "rapidfab/actions";
import * as Selectors from 'rapidfab/selectors';
import Gatekeeper from 'rapidfab/components/gatekeeper';
import PrintsComponent from 'rapidfab/components/plan/prints';

class PrintsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize()
  }

  render() {
    const { prints, locations, fetching, apiErrors, handleOnChange } = this.props;
    return(
      <Gatekeeper errors={apiErrors} loading={fetching}>
        <PrintsComponent
          prints={prints}
          locations={locations}
          onLocationChange={handleOnChange}
        />
      </Gatekeeper>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.order.list())
        .then( response => {
          const orders = response.json.resources.map(order => order.uri);
          for(let ordersChunk of _.chunk(orders, 15)) {
            dispatch(Actions.Api.wyatt.print.list({
              order: ordersChunk
            }));
          }
        });
      dispatch(Actions.Api.wyatt.location.list())
    },
    handleOnChange: location => {
      dispatch(Actions.LocationFilter.setLocation(location))
    }
  }
}

function mapStateToProps(state) {
  const {
    print,
    location,
  } = state.ui.wyatt
  const prints = Selectors.getPrints(state)
  const locationFilter = Selectors.getLocationFilter(state)
  let filteredPrints = null;
  if(locationFilter)
     filteredPrints = prints.filter( print => print.location === state.locationFilter.location);

  return {
    prints: filteredPrints || prints,
    locations: Selectors.getLocations(state),
    locationFilter: locationFilter,
    fetching: print.list.fetching || location.list.fetching,
    apiErrors: print.list.errors || location.list.errors,
  }
}
PrintsContainer.propTypes = {
  prints: PropTypes.array,
  locations: PropTypes.array,
  locationFilter: PropTypes.string,
  fetching: PropTypes.bool,
  apiErrors: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintsContainer)
