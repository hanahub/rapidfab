import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getBlockMachinesForMachine } from 'rapidfab/selectors';

import BlockMachines from 'rapidfab/components/blockMachine/BlockMachines';

class BlockMachinesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.dispatch(Actions.Api.wyatt['block-machine'].list());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fetching && !nextProps.fetching) {
      this.setState({ loading: false });
    }
  }

  render() {
    return <BlockMachines {...this.props} {...this.state} />;
  }
}

BlockMachinesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  machineUri: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  blockMachines: getBlockMachinesForMachine(state, ownProps.machineUri),
  fetching: state.ui.wyatt['block-machine'].list.fetching,
});

export default connect(mapStateToProps)(BlockMachinesContainer);
