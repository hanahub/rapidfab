import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import * as Selectors from 'rapidfab/selectors';

import PostProcessorForm from 'rapidfab/components/records/PostProcessorForm';

function redirect() {
  window.location.hash = '#/inventory/post-processors';
}

class PostProcessorFormContainer extends React.Component {
  constructor(props) {
    super(props);

    const { postProcessor } = this.props;
    if (postProcessor) {
      this.state = {
        name: postProcessor.name,
        loading: false,
        location: postProcessor.location,
        postProcessorType: postProcessor.post_processor_type,
        duration: postProcessor.duration.toString(),
      };
    } else {
      this.state = {
        name: '',
        loading: true,
        location: '',
        postProcessorType: '',
        duration: '',
      };
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, uuid } = this.props;
    Promise.all([
      dispatch(Actions.Api.wyatt.location.list()),
      dispatch(Actions.Api.wyatt['post-processor-type'].list()),
      uuid ? dispatch(Actions.Api.wyatt['post-processor'].get(uuid)) : null,
    ]).then(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(nextProps) {
    const { locations, postProcessor, postProcessorTypes, uuid } = this.props;
    if (uuid && !postProcessor && nextProps.postProcessor) {
      this.setState({
        duration: nextProps.postProcessor.duration,
        name: nextProps.postProcessor.name,
        postProcessorType: nextProps.postProcessor.post_processor_type,
        location: nextProps.postProcessor.location,
      });
    } else {
      if (locations.length === 0 && nextProps.locations.length > 0) {
        this.setState({ location: nextProps.locations[0].uri });
      }
      if (
        postProcessorTypes.length === 0 &&
        nextProps.postProcessorTypes.length > 0
      ) {
        this.setState({
          postProcessorType: nextProps.postProcessorTypes[0].uri,
        });
      }
    }
  }

  handleDelete() {
    this.props
      .dispatch(Actions.Api.wyatt['post-processor'].delete(this.props.uuid))
      .then(redirect);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, uuid } = this.props;
    const { duration, location, name, postProcessorType } = this.state;
    const payload = {
      duration: parseInt(duration, 10),
      location,
      name,
      post_processor_type: postProcessorType,
    };
    if (uuid) {
      dispatch(Actions.Api.wyatt['post-processor'].put(uuid, payload)).then(
        redirect
      );
    } else {
      dispatch(Actions.Api.wyatt['post-processor'].post(payload)).then(
        redirect
      );
    }
  }

  render() {
    return (
      <PostProcessorForm
        {...this.props}
        {...this.state}
        handleDelete={this.handleDelete}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        selectedPostProcessorType={this.props.postProcessorTypes.find(
          postProcessorType =>
            postProcessorType.uri === this.state.postProcessorType
        )}
      />
    );
  }
}

PostProcessorFormContainer.defaultProps = {
  postProcessor: null,
  uuid: null,
};

PostProcessorFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  postProcessor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    postProcessorType: PropTypes.string,
    duration: PropTypes.number,
  }),
  postProcessorTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  uuid: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  uuid: Selectors.getRoute(state, props).uuid,
  locations: Selectors.getLocations(state),
  postProcessor: Selectors.getRouteResource(state, props),
  postProcessorTypes: Selectors.getPostProcessorTypes(state),
  submitting:
    state.ui.wyatt['post-processor'].post.fetching ||
    state.ui.wyatt['post-processor'].put.fetching ||
    state.ui.wyatt['post-processor'].delete.fetching,
});

export default connect(mapStateToProps)(PostProcessorFormContainer);
