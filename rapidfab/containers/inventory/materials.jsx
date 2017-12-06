import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import MaterialsComponent from 'rapidfab/components/inventory/materials';

class MaterialsContainer extends Component {
  componentDidMount() {
    const { bureau, dispatch } = this.props;
    dispatch(Actions.Api.wyatt.manufacturer.list());
    dispatch(Actions.Api.wyatt.material.list({ bureau }));
  }

  render() {
    return <MaterialsComponent {...this.props} />;
  }
}

MaterialsContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bureau: Selectors.getBureauUri(state),
  fetching: isFetchingInitial(
    state.ui.wyatt.manufacturer.list,
    state.ui.wyatt.material.list
  ),
  materials: Selectors.getMaterials(state),
  manufacturers: Selectors.getManufacturers(state),
});

export default connect(mapStateToProps)(MaterialsContainer);
