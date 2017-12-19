import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import extractUuid from 'rapidfab/utils/extractUuid';
import Actions from 'rapidfab/actions';

import Loading from 'rapidfab/components/Loading';
import RunRecordSchedule from 'rapidfab/components/records/run/RunRecordSchedule';

class RunRecordScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
        .add(1, 'd')
        .format('YYYY-MM-DD'),
      startTime: moment()
        .minutes(0)
        .add(1, 'h')
        .format('HH:mm'),
      runQueue: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { dispatch, route: { uuid } } = this.props;
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));
    dispatch(Actions.Api.wyatt.run.get(uuid)).then(runResponse => {
      const printer = runResponse.json.printer;
      const printerUUID = extractUuid(printer);
      const onPrinterResponse = dispatch(
        Actions.Api.wyatt.printer.get(printerUUID)
      );
      const onRunsResponse = dispatch(
        Actions.Api.wyatt.run.list({
          printer,
        })
      );
      Promise.all([onPrinterResponse, onRunsResponse]).then(responses => {
        const printerResponse = responses[0];
        const runsResponse = responses[1];
        const runQueue = printerResponse.json.queue.map(runURI =>
          runsResponse.json.resources.find(run => run.uri === runURI)
        );
        this.setState({ runQueue });
      });
    });
  }

  getStart() {
    const { startDate, startTime } = this.state;
    return moment(`${startDate} ${startTime}`);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { dispatch, uri } = this.props;
    const payload = { actuals: { start: this.getStart().toISOString() } };
    const response = await dispatch(
      Actions.Api.wyatt.run.put(extractUuid(uri), payload)
    );
    console.log(response);
  }

  isStartValid() {
    return this.getStart().isAfter(moment());
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
        isStartValid={this.isStartValid()}
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
          uri: run.uri,
        }
      : null
  );
};

export default connect(mapStateToProps)(RunRecordScheduleContainer);
