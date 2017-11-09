import React, { Component } from 'react';

import BlockMachine from 'rapidfab/components/blockMachine/BlockMachine';

class BlockMachineContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selection: 'none' };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  handleSelectionChange(selection) {
    this.setState({ selection });
  }

  render() {
    return (
      <BlockMachine
        {...this.props}
        handleSelectionChange={this.handleSelectionChange}
        selection={this.state.selection}
      />
    );
  }
}

export default BlockMachineContainer;
