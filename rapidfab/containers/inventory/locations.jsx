import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import isFetchingInitial from 'rapidfab/utils/isFetchingInitial';
import * as Selectors from 'rapidfab/selectors';

import LocationsComponent from 'rapidfab/components/inventory/locations';

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

const mapDispatchToProps = dispatch => ({
  onInitialize: bureauGroup => {
    dispatch(
      Actions.Api.pao.users.list({
        group: bureauGroup,
      })
    );
    dispatch(Actions.Api.wyatt.location.list());
  },
});

const mapStateToProps = state => ({
  fetching: isFetchingInitial(
    state.ui.wyatt.location.list,
    state.ui.pao.users.list
  ),
  locations: Selectors.getLocations(state),
  users: Selectors.getUsersByUri(state),
  bureauGroup: Selectors.getBureau(state).group,
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer);
