import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import RunsComponent from 'rapidfab/components/plan/runs';
import * as Selectors from 'rapidfab/selectors';

class RunsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize();
  }

  render() {
    return <RunsComponent {...this.props} />;
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
  const runs = Selectors.getRuns(state);
  const locationFilter = Selectors.getLocationFilter(state);
  let filteredRuns = null;
  if (locationFilter) {
    filteredRuns = _.filter(runs, ['location', state.locationFilter.location]);
  }
  return {
    runs: filteredRuns || runs,
    locations: Selectors.getLocations(state),
    locationFilter,
    fetching: run.list.count === 0 || (run.list.count === 1 && run.list.fetching),
    apiErrors: run.list.errors || location.list.errors,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RunsContainer);
