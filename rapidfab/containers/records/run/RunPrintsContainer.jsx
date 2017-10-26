import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getOrders, getRunPrintsGridData } from 'rapidfab/selectors';

import RunPrints from 'rapidfab/components/records/run/RunPrints';

class RunPrintsContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Actions.Api.wyatt.print.list());
    dispatch(Actions.Api.wyatt.order.list());
  }

  render() {
    return <RunPrints {...this.props} />;
  }
}

RunPrintsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orders: getOrders(state),
  gridData: getRunPrintsGridData(state),
});

export default connect(mapStateToProps)(RunPrintsContainer);
