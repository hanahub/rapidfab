import _                                from "lodash";
import React, { Component, PropTypes }  from "react"
import Actions                          from "rapidfab/actions"
import { connect }                      from 'react-redux'
import QueuesComponent                  from 'rapidfab/components/work/queues'
import * as Selectors                   from 'rapidfab/selectors'


class QueuesContainer extends Component {
  componentWillMount() {
    this.props.onInitialize()
  }

  render() {
    return <QueuesComponent {...this.props}/>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleOnChange: location => {
      dispatch(Actions.LocationFilter.setLocation(location))
    },
    onInitialize: () => {
      dispatch(Actions.Api.nautilus.modeler.list())
      dispatch(Actions.Api.wyatt['post-processor-type'].list())
      dispatch(Actions.Api.wyatt['post-processor'].list())
      dispatch(Actions.Api.wyatt.printer.list())
      dispatch(Actions.Api.wyatt.run.list())
      dispatch(Actions.Api.wyatt.location.list())
    },
  }
}

function mapStateToProps(state) {
  const postProcessor = state.ui.wyatt['post-processor']
  const {
    printer,
    location,
    run
  } = state.ui.wyatt
  const runs = Selectors.getRuns(state)
  const machines = Selectors.getMachinesForQueues(state)
  const locationFilter = Selectors.getLocationFilter(state)
  let filteredRuns = null;
  if(locationFilter) {
     filteredRuns = _.filter(runs, ['location', locationFilter]);
  }
  let filteredMachines = null;
  if(locationFilter) {
     filteredMachines = _.filter(machines, ['location', locationFilter]);
  }

  return {
    machines      : filteredMachines || machines,
    runs          : filteredRuns || runs,
    locations     : Selectors.getLocations(state),
    locationFilter: locationFilter,
    fetching      : run.list.fetching || printer.list.fetching || postProcessor.list.fetching || location.list.fetching,
    apiErrors     : _.concat(run.list.errors, postProcessor.list.errors, printer.list.errors, location.list.errors)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuesContainer)
