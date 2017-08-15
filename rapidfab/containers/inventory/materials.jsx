import _ from 'lodash';
import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import MaterialsComponent from 'rapidfab/components/inventory/materials';
import * as Selectors from 'rapidfab/selectors';


class MaterialsContainer extends Component {
  componentWillMount() {
    const { bureau, dispatch } = this.props;
    dispatch(Actions.Api.wyatt.manufacturer.list());
    dispatch(Actions.Api.wyatt.material.list({ bureau: bureau.uri }));
  }

  render() {
    return <MaterialsComponent {...this.props} />;
  }
}

function mapStateToProps(state) {
  const {
    material,
    manufacturer,
  } = state.ui.wyatt;

  return {
    bureau: Selectors.getBureau(state),
    materials: Selectors.getMaterials(state),
    manufacturers: Selectors.getManufacturers(state),
    fetching: material.list.fetching || manufacturer.list.fetching,
    apiErrors: _.concat(material.list.errors, manufacturer.list.errors),
  };
}

export default connect(mapStateToProps)(MaterialsContainer);
