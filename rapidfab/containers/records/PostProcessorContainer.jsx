import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getRouteResource } from 'rapidfab/selectors';

import PostProcessor from 'rapidfab/components/records/PostProcessor';

class PostProcessorContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { tab: 1 };

    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  componentDidMount() {
    const { dispatch, route } = this.props;
    if (route.uuid) {
      dispatch(Actions.Api.wyatt['post-processor'].get(route.uuid));
    }
  }

  handleSelectTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <PostProcessor
        {...this.props}
        {...this.state}
        handleSelectTab={this.handleSelectTab}
      />
    );
  }
}

PostProcessorContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.shape({ uuid: PropTypes.string }).isRequired,
};

const mapStateToProps = (state, props) => {
  const postProcessor = getRouteResource(state, props);
  if (!postProcessor) return {};
  return {
    uri: postProcessor.uri,
    name: postProcessor.name,
  };
};

export default connect(mapStateToProps)(PostProcessorContainer);
