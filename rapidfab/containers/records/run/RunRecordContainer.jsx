import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

import RunRecord from 'rapidfab/components/records/run/RunRecord';

class RunRecordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { tab: 1 };

    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  componentWillMount() {
    const { dispatch, route: { uuid } } = this.props;
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));
    dispatch(Actions.Api.wyatt.run.get(uuid));
  }

  handleSelectTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <RunRecord
        {...this.props}
        {...this.state}
        handleSelectTab={this.handleSelectTab}
      />
    );
  }
}

RunRecordContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
};

const mapStateToProps = state => {
  const run = getRouteUUIDResource(state);
  return Object.assign(
    {},
    { isRunFetching: !run && state.ui.wyatt.run.get.fetching },
    run ? { id: run.id } : null
  );
};

export default connect(mapStateToProps)(RunRecordContainer);
