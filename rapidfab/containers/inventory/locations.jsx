import _ from 'lodash';
import React, { Component } from 'react';
import Actions from 'rapidfab/actions';
import { connect } from 'react-redux';
import LocationsComponent from 'rapidfab/components/inventory/locations';
import * as Selectors from 'rapidfab/selectors';

class LocationsContainer extends Component {
  componentDidMount() {
    this.props.onInitialize(this.props.bureau);
  }

  render() {
    return <LocationsComponent {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onInitialize: bureau => {
      dispatch(
        Actions.Api.pao.users.list({
          group: bureau.GROUP,
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
    bureau: Selectors.getBureau(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer);
