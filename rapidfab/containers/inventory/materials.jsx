import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import MaterialsComponent from 'rapidfab/components/inventory/materials';
import * as Selectors from 'rapidfab/selectors';

class MaterialsContainer extends Component {
  componentWillMount() {
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

function mapStateToProps(state) {
  const manufacturerApi = state.ui.wyatt.manufacturer.list;
  const materialApi = state.ui.wyatt.material.list;
  const fetching =
    manufacturerApi.count === 0 ||
    (manufacturerApi.count === 1 && manufacturerApi.fetching) ||
    (materialApi.count === 0 ||
      (materialApi.count === 1 && materialApi.fetching));

  return {
    bureau: Selectors.getBureauUri(state),
    fetching,
    materials: Selectors.getMaterials(state),
    manufacturers: Selectors.getManufacturers(state),
  };
}

export default connect(mapStateToProps)(MaterialsContainer);
