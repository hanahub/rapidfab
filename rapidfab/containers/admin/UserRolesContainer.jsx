import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserRoles } from 'rapidfab/selectors';

import UserRoles from 'rapidfab/components/admin/UserRoles';

class UserRolesContainer extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <UserRoles userRoles={this.props.userRoles} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  userRoles: getUserRoles(state, ownProps.user)
});

export default connect(mapStateToProps)(UserRolesContainer);
