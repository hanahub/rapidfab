import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getBlockMachinesForMachine } from 'rapidfab/selectors';

import BlockMachines from 'rapidfab/components/inventory/BlockMachines';

class BlockMachineContainer extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.Api.wyatt['block-machine'].list());
  }

  render() {
    return (
      <BlockMachines {...this.props} />
    );
  }
}

BlockMachineContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  machineType: PropTypes.oneOf(['post-processor', 'printer']).isRequired,
  uri: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  blockMachines: getBlockMachinesForMachine(state, ownProps.uri),
});

export default connect(mapStateToProps)(BlockMachineContainer);
