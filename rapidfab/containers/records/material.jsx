import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import MaterialComponent from 'rapidfab/components/records/material';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'description',
  'color',
  'type',
  'manufacturer',
  'units',
  'cost',
  'third_party_fulfillment',
  'post_processing_seconds',
  'bureau',
];

class MaterialContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid);
  }

  render() {
    return <MaterialComponent {...this.props} />;
  }
}

MaterialContainer.defaultProps = {
  uuid: null,
};

MaterialContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
  uuid: PropTypes.string,
};

function redirect() {
  window.location.hash = '#/inventory/materials';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      dispatch(Actions.Api.wyatt.manufacturer.list());
      if (uuid) {
        dispatch(Actions.Api.wyatt.material.get(uuid));
      }
    },
    onSubmit: payload => {
      const validatedPayload = Object.assign({}, payload, {
        third_party_fulfillment: payload.third_party_fulfillment
          ? payload.third_party_fulfillment
          : false,
      });

      if (payload.uuid) {
        dispatch(
          Actions.Api.wyatt.material.put(payload.uuid, validatedPayload)
        ).then(redirect);
      } else {
        dispatch(Actions.Api.wyatt.material.post(validatedPayload)).then(
          redirect
        );
      }
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt.material.delete(uuid)).then(redirect);
      }
    },
  };
}

function mapStateToProps(state, props) {
  return {
    uuid: Selectors.getRoute(state, props).uuid,
    initialValues: Selectors.getInitialValuesBureau(state, props),
    submitting: Selectors.getResourceFetching(state, 'wyatt.material'),
    apiErrors: Selectors.getResourceErrors(state, 'wyatt.material'),
    manufacturers: Selectors.getManufacturers(state),
  };
}

export default reduxForm(
  {
    form: 'record.material',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(MaterialContainer);
