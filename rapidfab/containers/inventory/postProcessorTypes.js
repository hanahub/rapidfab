import _ from 'lodash';
import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import PostProcessorTypesComponent from 'rapidfab/components/inventory/postProcessorTypes';
import * as Selectors from 'rapidfab/selectors';


class PostProcessorTypesContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.bureau);
  }
  render() {
    return <PostProcessorTypesComponent {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (bureau) => {
      dispatch(Actions.Api.wyatt.manufacturer.list());
      dispatch(Actions.Api.wyatt.material.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.wyatt['post-processor-type'].list());
    },
  };
}

function mapStateToProps(state) {
  const postProcessorType = state.ui.wyatt['post-processor-type'];
  const {
    manufacturer,
    material,
  } = state.ui.wyatt;

  return {
    bureau: Selectors.getBureau(state),
    manufacturers: Selectors.getManufacturers(state),
    materials: Selectors.getMaterials(state),
    postProcessorTypes: Selectors.getPostProcessorTypes(state),
    fetching: manufacturer.list.fetching || postProcessorType.list.fetching || material.list.fetching,
    apiErrors: _.concat(manufacturer.list.errors, postProcessorType.list.errors, material.list.errors),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProcessorTypesContainer);
