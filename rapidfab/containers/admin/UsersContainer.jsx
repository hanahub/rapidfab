import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getUsers } from 'rapidfab/selectors';

class UsersContainer extends React.Component {
  componentDidMount() { this.props.fetchUsers() }

  render() {
    const { users } = this.props;
    return (
      <div>
        { users.map(user => <p>{user.name}</p> )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(Actions.Api.pao.users.list())
});

const mapStateToProps = state => ({ users: getUsers(state) });

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
