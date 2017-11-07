import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Printer from 'rapidfab/components/records/Printer';

class PrinterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { tab: 1 };

    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  handleSelectTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <Printer
        handleSelectTab={this.handleSelectTab}
        route={this.props.route}
        tab={this.state.tab}
      />
    );
  }
}

PrinterContainer.propTypes = {
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
};

export default PrinterContainer;
