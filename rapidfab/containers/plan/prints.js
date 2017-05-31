import _                                from "lodash";
import React, { Component }             from "react";
import PropTypes                        from 'prop-types';
import Actions                          from "rapidfab/actions";
import { connect }                      from 'react-redux';
import * as Selectors                   from 'rapidfab/selectors';
import PrintsComponent                  from 'rapidfab/components/plan/prints';

class PrintsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize()
  }

  render() {
    return <PrintsComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.print.list())
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
  if(locationFilter) {
     filteredPrints = _.filter(prints, ['location' , state.locationFilter.location]);
  }
  return {
    prints         : filteredPrints || prints,
    locations      : Selectors.getLocations(state),
    locationFilter : locationFilter,
    fetching       : print.list.fetching || location.list.fetching,
    apiErrors      : print.list.errors || location.list.errors,
  }
}

PrintsContainer.propTypes = {
  prints: PropTypes.array,
  locations: PropTypes.array,
  fetching: PropTypes.bool,
  apiErrors: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintsContainer)
