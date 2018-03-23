import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import Shipping from 'rapidfab/components/records/shipping';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = [
  'id',
  'uuid',
  'name',
  'description',
  'region',
  'cost',
  'bureau',
];

class ShippingContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid);
  }

  render() {
    return <Shipping {...this.props} />;
  }
}

ShippingContainer.defaultProps = {
  uuid: null,
};

ShippingContainer.propTypes = {
  onInitialize: PropTypes.func.isRequired,
  uuid: PropTypes.string,
};

function redirect() {
  window.location.hash = '#/inventory/shipping';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt.shipping.get(uuid));
      }
    },
    onSubmit: payload => {
      if (payload.uuid) {
        dispatch(Actions.Api.wyatt.shipping.put(payload.uuid, payload)).then(
          redirect
        );
      } else {
        dispatch(Actions.Api.wyatt.shipping.post(payload)).then(redirect);
      }
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt.shipping.delete(uuid)).then(redirect);
      }
    },
  };
}

function mapStateToProps(state, props) {
  return {
    uuid: Selectors.getRoute(state, props).uuid,
    initialValues: Selectors.getInitialValuesBureau(state, props),
    submitting: Selectors.getResourceFetching(state, 'wyatt.shipping'),
  };
}

export default reduxForm(
  {
    form: 'record.shipping',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(ShippingContainer);
