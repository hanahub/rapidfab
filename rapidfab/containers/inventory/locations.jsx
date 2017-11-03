import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import LocationsComponent from 'rapidfab/components/inventory/locations';
import * as Selectors from 'rapidfab/selectors';

class LocationsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props.bureauGroup);
  }

  render() {
    return <LocationsComponent {...this.props} />;
  }
}

LocationsContainer.propTypes = {
  bureauGroup: PropTypes.string.isRequired,
  onInitialize: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureauGroup => {
      dispatch(
        Actions.Api.pao.users.list({
          group: bureauGroup,
        })
      );
      dispatch(Actions.Api.wyatt.location.list());
    },
  };
}

function mapStateToProps(state) {
  const { location } = state.ui.wyatt;

  const { users } = state.ui.pao;

  return {
    locations: Selectors.getLocations(state),
    users: Selectors.getUsers(state),
    fetching: location.list.fetching || users.list.fetching,
    errors: _.concat(location.list.errors, users.list.errors),
    bureauGroup: Selectors.getBureau(state).group,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer);
