import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUsers } from 'rapidfab/selectors';

import User from 'rapidfab/components/admin/User';

class UserContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <User user={this.props.user}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: getUsers(state).find(user => user.uuid === ownProps.uuid),
});

export default connect(mapStateToProps)(UserContainer);
