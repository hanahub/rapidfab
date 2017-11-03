import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import LocationComponent from 'rapidfab/components/records/location';
import { reduxForm } from 'redux-form';
import * as Selectors from 'rapidfab/selectors';

const fields = [
  'id',
  'uri',
  'uuid',
  'name',
  'phone',
  'bureau',
  'address',
  'contact',
];

class LocationContainer extends Component {
  componentWillMount() {
    this.props.onInitialize(this.props.uuid, this.props.bureauGroup);
  }
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return <LocationComponent {...this.props} />;
  }
}

LocationContainer.propTypes = {
  bureauGroup: PropTypes.string.isRequired,
  onInitialize: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

function redirect() {
  window.location.hash = '#/inventory/locations';
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: (uuid, bureauGroup) => {
      dispatch(
        Actions.Api.pao.users.list({
          group: bureauGroup,
        })
      );
      if (uuid) {
        dispatch(Actions.Api.wyatt.location.get(uuid));
      }
    },
    onSubmit: payload => {
      if (payload.uuid) {
        dispatch(Actions.Api.wyatt.location.put(payload.uuid, payload)).then(
          redirect
        );
      } else {
        dispatch(Actions.Api.wyatt.location.post(payload)).then(redirect);
      }
    },
    onUnmount: () => {
      // get rid of pesky lingering errors
      dispatch(Actions.UI.clearUIState(['wyatt.location']));
    },
    onDelete: uuid => {
      if (uuid) {
        dispatch(Actions.Api.wyatt.location.delete(uuid)).then(redirect);
      }
    },
  };
}

function mapStateToProps(state, props) {
  return {
    uuid: Selectors.getRoute(state, props).uuid,
    initialValues: Selectors.getInitialValuesBureau(state, props),
    submitting: Selectors.getResourceFetching(state, 'wyatt.location'),
    apiErrors: Selectors.getResourceErrors(state, 'wyatt.location'),
    users: Selectors.getUsers(state),
    bureauGroup: Selectors.getBureau(state).group,
  };
}

export default reduxForm(
  {
    form: 'record.location',
    fields,
  },
  mapStateToProps,
  mapDispatchToProps
)(LocationContainer);
