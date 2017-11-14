import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getUsers, isSessionManager, isSessionUser } from 'rapidfab/selectors';

import User from 'rapidfab/components/admin/User';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { view: 'main' };

    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.uuid && nextProps.uuid) {
      this.setState({ view: 'main' });
    }
  }

  handleDeleteUser() {
    this.props
      .dispatch(Actions.Api.pao.users.delete(this.props.uuid))
      .then(() => this.props.handleSelectionChange('none'))
      .catch(() => {});
  }

  handleViewChange(view) {
    this.setState({ view });
  }

  render() {
    return (
      <User
        handleDeleteUser={this.handleDeleteUser}
        handleSelectionChange={this.props.handleSelectionChange}
        handleViewChange={this.handleViewChange}
        isSessionUser={isSessionUser}
        {...this.props}
        {...this.state}
      />
    );
  }
}

UserContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  isSessionManager: PropTypes.bool.isRequired,
  isSessionUser: PropTypes.bool.isRequired,
  uuid: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isSessionManager: isSessionManager(state),
  isSessionUser: isSessionUser(state, ownProps.uuid),
  user: getUsers(state).find(user => user.uuid === ownProps.uuid),
});

export default connect(mapStateToProps)(UserContainer);
