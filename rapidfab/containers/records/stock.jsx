import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import StockComponent from 'rapidfab/components/records/stock';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = [
  'id',
  'uri',
  'uuid',
  'material',
  'location',
  'status',
  'quantity',
  'units',
];

class StockContainer extends Component {
  componentWillMount() {
    const { bureau, uuid } = this.props;
    this.props.onInitialize(bureau, uuid);
  }

  render() {
    return <StockComponent {...this.props} />;
  }
}

function redirect() {
  window.location.hash = '#/inventory/stocks';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (bureau, uuid) => {
      dispatch(Actions.Api.wyatt.material.list({ bureau: bureau.uri }));
      dispatch(Actions.Api.wyatt.location.list());
      if (uuid) dispatch(Actions.Api.wyatt.stock.get(uuid));
    },
    onSubmit: (payload) => {
      if (payload.uuid) {
        dispatch(Actions.Api.wyatt.stock.put(payload.uuid, payload)).then(redirect);
      } else {
        dispatch(Actions.Api.wyatt.stock.post(payload)).then(redirect);
      }
    },
    onDelete: (uuid) => {
      if (uuid) {
        dispatch(Actions.Api.wyatt.stock.delete(uuid)).then(redirect);
      }
    },
  };
}

function mapStateToProps(state, props) {
  return {
    bureau: Selectors.getBureau(state),
    uuid: Selectors.getRoute(state, props).uuid,
    initialValues: Selectors.getRouteResource(state, props),
    submitting: Selectors.getResourceFetching(state, 'wyatt.stock'),
    apiErrors: Selectors.getResourceErrors(state, 'wyatt.stock'),
    materials: Selectors.getMaterials(state),
    locations: Selectors.getLocations(state),
  };
}

export default reduxForm({
  form: 'record.stock',
  fields,
}, mapStateToProps, mapDispatchToProps)(StockContainer);
