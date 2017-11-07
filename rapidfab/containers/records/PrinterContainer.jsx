import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';

import Printer from 'rapidfab/components/records/Printer';

class PrinterContainer extends Component {

  render() {
    return <Printer route={this.props.route} />;
  }
}

PrinterContainer.propTypes = {
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
};

export default connect()(PrinterContainer);
