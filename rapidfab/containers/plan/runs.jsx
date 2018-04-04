import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getLocationFilter, getLocations, getRuns } from 'rapidfab/selectors';

import Runs from 'rapidfab/components/plan/runs';

class RunsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize();
  }

  render() {
    return <Runs {...this.props} />;
  }
}

RunsContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt.run.list());
      dispatch(Actions.Api.wyatt.location.list());
    },
    handleOnChange: location => {
      dispatch(Actions.LocationFilter.setLocation(location));
    },
  };
}

function mapStateToProps(state) {
  const { run, location } = state.ui.wyatt;
  const runs = getRuns(state);
  const locationFilter = getLocationFilter(state);
  let filteredRuns = null;
  if (locationFilter) {
    filteredRuns = runs.filter(
      r => r.location === state.locationFilter.location
    );
  }
  return {
    runs: filteredRuns || runs,
    locations: getLocations(state),
    locationFilter,
    fetching:
      run.list.count === 0 || (run.list.count === 1 && run.list.fetching),
    apiErrors: run.list.errors || location.list.errors,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RunsContainer);
