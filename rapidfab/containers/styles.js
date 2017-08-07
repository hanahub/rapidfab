import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import StyleComponent from 'rapidfab/components/styles';

class StyleContainer extends Component {
  componentWillMount() {
  }
  render() {
    return <StyleComponent {...this.props} />;
  }
}


function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
    },
  };
}

function mapStateToProps(state) {
  const {
  } = state.ui.wyatt;

  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleContainer);
