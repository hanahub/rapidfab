import _ from 'lodash';
import React, { Component } from 'react';
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
  const postProcessor = state.ui.wyatt['post-processor'];
  const postProcessorType = state.ui.wyatt['post-processor-type'];
  const {
    location,
  } = state.ui.wyatt;

  return {
    postProcessors: Selectors.getPostProcessors(state),
    postProcessorTypes: Selectors.getPostProcessorTypes(state),
    locations: Selectors.getLocations(state),
    fetching: location.list.fetching || postProcessorType.list.fetching || postProcessor.list.fetching,
    apiErrors: _.concat(location.list.errors, postProcessorType.list.errors, postProcessor.list.errors),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProcessorsContainer);
