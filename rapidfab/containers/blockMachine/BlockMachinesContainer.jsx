import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getBlockMachinesForMachine } from 'rapidfab/selectors';

import BlockMachines from 'rapidfab/components/blockMachine/BlockMachines';

class BlockMachinesContainer extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.Api.wyatt['block-machine'].list());
  }

  render() {
    return <BlockMachines {...this.props} />;
  }
}

BlockMachinesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  machineUri: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  blockMachines: getBlockMachinesForMachine(state, ownProps.machineUri),
});

export default connect(mapStateToProps)(BlockMachinesContainer);
