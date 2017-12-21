import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getDowntimesForMachine } from 'rapidfab/selectors';

import Downtimes from 'rapidfab/components/downtime/Downtimes';

class DowntimesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.dispatch(Actions.Api.wyatt.downtime.list());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fetching && !nextProps.fetching) {
      this.setState({ loading: false });
    }
  }

  render() {
    return <Downtimes {...this.props} {...this.state} />;
  }
}

DowntimesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  machineUri: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  downtimes: getDowntimesForMachine(state, ownProps.machineUri),
  fetching: state.ui.wyatt.downtime.list.fetching,
});

export default connect(mapStateToProps)(DowntimesContainer);
