import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

import RunRecordSchedule from 'rapidfab/components/records/run/RunRecordSchedule';

class RunRecordScheduleContainer extends Component {
  componentWillMount() {
    const { dispatch, route: { uuid } } = this.props;
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));
    dispatch(Actions.Api.wyatt.run.get(uuid));
  }

  render() {
    return <RunRecordSchedule />;
  }
}

RunRecordScheduleContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
};

const mapStateToProps = state => {
  const run = getRouteUUIDResource(state);
  return Object.assign(
    {},
    { isRunFetching: !run && state.ui.wyatt.run.get.fetching },
    run
      ? {
          id: run.id,
          operation: run.operation,
        }
      : null
  );
};

export default connect(mapStateToProps)(RunRecordScheduleContainer);
