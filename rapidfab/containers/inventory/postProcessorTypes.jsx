import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import PostProcessorTypesComponent from 'rapidfab/components/inventory/postProcessorTypes';
import * as Selectors from 'rapidfab/selectors';

import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';

class PostProcessorTypesContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.bureau);
  }
  render() {
    return <PostProcessorTypesComponent {...this.props} />;
  }
}

PostProcessorTypesContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  onInitialize: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      dispatch(Actions.Api.wyatt.manufacturer.list());
      dispatch(Actions.Api.wyatt.material.list({ bureau }));
      dispatch(Actions.Api.wyatt['post-processor-type'].list());
    },
  };
}

function mapStateToProps(state) {
  return {
    bureau: Selectors.getBureauUri(state),
    fetching: isFetchingInitial(
      state.ui.wyatt['post-processor-type'].list,
      state.ui.wyatt.manufacturer.list,
      state.ui.wyatt.material.list
    ),
    manufacturers: Selectors.getManufacturers(state),
    materials: Selectors.getMaterials(state),
    postProcessorTypes: Selectors.getPostProcessorTypes(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PostProcessorTypesContainer
);
