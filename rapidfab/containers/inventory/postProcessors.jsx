import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import PostProcessorsComponent from 'rapidfab/components/inventory/postProcessors';

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

const mapDispatchToProps = dispatch => ({
  onInitialize: () => {
    dispatch(Actions.Api.wyatt['post-processor-type'].list());
    dispatch(Actions.Api.wyatt.location.list());
    dispatch(Actions.Api.wyatt['post-processor'].list());
  },
});

const mapStateToProps = state => ({
  postProcessors: Selectors.getPostProcessors(state),
  postProcessorTypes: Selectors.getPostProcessorTypes(state),
  locations: Selectors.getLocations(state),
  fetching: isFetchingInitial(
    state.ui.wyatt.location.list,
    state.ui.wyatt['post-processor'].list,
    state.ui.wyatt['post-processor-type'].list
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PostProcessorsContainer
);
