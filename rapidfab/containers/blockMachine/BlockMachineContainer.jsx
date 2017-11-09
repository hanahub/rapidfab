import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Actions from 'rapidfab/actions';

import BlockMachine from 'rapidfab/components/blockMachine/BlockMachine';

class BlockMachineContainer extends Component {
  render() {
    return (
      <BlockMachine {...this.props} />
    );
  }
}

export default BlockMachineContainer;
