import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import {
  getBureauURI,
  getLocations,
  getUserRoles,
} from 'rapidfab/selectors';

import UserRoles from 'rapidfab/components/admin/UserRoles';

class UserRolesContainer extends React.Component {
  constructor() {
    super()

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    const { name, checked } = event.target;
    if (checked) {
      const payload = {
        bureau: this.props.bureau,
        username: this.props.user.username,
        role: name,
      }
      this.createRole(payload)
    } else {
      const { uuid } = this.props.userRoles.find(role => role.role === name)
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
    const isManager = this.props.userRoles.some(role => role.role === 'manager')
    return (
      <UserRoles
        handleToggle={this.handleToggle}
        isManager={isManager}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  bureau: getBureauURI(state),
  locations: getLocations(state),
  userRoles: getUserRoles(state, ownProps.user)
});

UserRolesContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  userRoles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(UserRolesContainer);
