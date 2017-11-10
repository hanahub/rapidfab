import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getRouteResource } from 'rapidfab/selectors';

import Printer from 'rapidfab/components/records/Printer';

class PrinterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { tab: 1 };

    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  componentDidMount() {
    const { dispatch, route } = this.props;
    if (route.uuid) {
      dispatch(Actions.Api.wyatt.printer.get(route.uuid));
    }
  }

  handleSelectTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <Printer
        {...this.props}
        {...this.state}
        handleSelectTab={this.handleSelectTab}
      />
    );
  }
}

PrinterContainer.defaultProps = {
  uri: null,
};

PrinterContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
  uri: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  const printer = getRouteResource(state, props);
  if (!printer) return {};
  return {
    uri: printer.uri,
    name: printer.name,
  };
};

export default connect(mapStateToProps)(PrinterContainer);
