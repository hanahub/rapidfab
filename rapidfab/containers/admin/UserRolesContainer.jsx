import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import {
  getBureauUri,
  getLocations,
  isSessionManager,
  getUserRoles,
} from 'rapidfab/selectors';

import UserRoles from 'rapidfab/components/admin/UserRoles';

class UserRolesContainer extends React.Component {
  constructor() {
    super();

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(Actions.Api.wyatt.location.list());
  }

  handleToggle(event) {
    const { name, checked, dataset } = event.target;
    if (checked) {
      const payload = {
        bureau: this.props.bureau,
        location: dataset.location || null,
        username: this.props.user.username,
        role: name,
      };
      this.createRole(payload);
    } else {
      const { uuid } = this.props.userRoles.find(
        role =>
          dataset.location
            ? role.location === dataset.location
            : role.role === name
      );
      this.deleteRole(uuid);
    }
  }

  createRole(payload) {
    this.props.dispatch(Actions.Api.wyatt.role.post(payload));
  }

  deleteRole(uuid) {
    this.props.dispatch(Actions.Api.wyatt.role.delete(uuid));
  }

  render() {
    const userRoles = this.props.userRoles.map(
      role => (role.location ? role.location : role.role)
    );
    return (
      <UserRoles
        handleToggle={this.handleToggle}
        locations={this.props.locations}
        isSessionManager={this.props.isSessionManager}
        userRoles={userRoles}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  bureau: getBureauUri(state),
  locations: getLocations(state),
  isSessionManager: isSessionManager(state),
  userRoles: getUserRoles(state, ownProps.user),
});

UserRolesContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSessionManager: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  userRoles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(UserRolesContainer);
