import React, { Component } from 'react';

import Downtime from 'rapidfab/components/downtime/Downtime';

class DowntimeContainer extends Component {
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
      <Downtime
        {...this.props}
        handleSelectionChange={this.handleSelectionChange}
        selection={this.state.selection}
      />
    );
  }
}

export default DowntimeContainer;
