import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import PostProcessorsComponent from 'rapidfab/components/inventory/postProcessors';
import * as Selectors from 'rapidfab/selectors';

class PostProcessorsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize();
  }
  render() {
    return <PostProcessorsComponent {...this.props} />;
  }
}

PostProcessorsContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: () => {
      dispatch(Actions.Api.wyatt['post-processor-type'].list());
      dispatch(Actions.Api.wyatt.location.list());
      dispatch(Actions.Api.wyatt['post-processor'].list());
    },
  };
}

function mapStateToProps(state) {
  const locationApi = state.ui.wyatt.location.list;
  const postProcessorApi = state.ui.wyatt['post-processor'].list;
  const postProcessorTypeApi = state.ui.wyatt['post-processor-type'].list;

  return {
    postProcessors: Selectors.getPostProcessors(state),
    postProcessorTypes: Selectors.getPostProcessorTypes(state),
    locations: Selectors.getLocations(state),
    fetching:
      locationApi.count === 0 ||
      (locationApi.count === 1 && locationApi.fetching) ||
      (postProcessorApi.count === 0 ||
        (postProcessorApi.count === 1 && postProcessorApi.fetching)) ||
      (postProcessorTypeApi.count === 0 ||
        (postProcessorTypeApi.count === 1 && postProcessorTypeApi.fetching)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PostProcessorsContainer
);
