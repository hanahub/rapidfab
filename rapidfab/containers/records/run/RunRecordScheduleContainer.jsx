import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

import Loading from 'rapidfab/components/Loading';
import RunRecordSchedule from 'rapidfab/components/records/run/RunRecordSchedule';

class RunRecordScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      startTime: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    const { dispatch, route: { uuid } } = this.props;
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));
    dispatch(Actions.Api.wyatt.run.get(uuid));
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    console.log('submit');
  }

  render() {
    return this.props.isRunFetching ? (
      <Loading />
    ) : (
      <RunRecordSchedule
        {...this.props}
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
      />
    );
  }
}

RunRecordScheduleContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isRunFetching: PropTypes.bool.isRequired,
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
