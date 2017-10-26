import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRouteUUIDResource } from 'rapidfab/selectors';
import Actions from 'rapidfab/actions';

import RunRecord from 'rapidfab/components/records/run/RunRecord';

class RunRecordContainer extends Component {
  componentWillMount() {
    const { dispatch, route: { uuid } } = this.props;
    dispatch(Actions.RouteUUID.setRouteUUID(uuid));
    dispatch(Actions.Api.wyatt.run.get(uuid));
  }

  render() {
    return <RunRecord {...this.props} />;
  }
}

RunRecordContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
};

const mapStateToProps = state => {
  const run = getRouteUUIDResource(state);
  if (!run) return {};
  return { id: run.id };
};

export default connect(mapStateToProps)(RunRecordContainer);
