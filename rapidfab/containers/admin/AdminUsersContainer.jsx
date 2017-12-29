import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isSessionManager } from 'rapidfab/selectors';

import AdminUsers from 'rapidfab/components/admin/AdminUsers';

class AdminUsersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selection: 'none' };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  handleSelectionChange(selection) {
    this.setState({ selection });
  }

  render() {
    return (
      <AdminUsers
        selection={this.state.selection}
        handleSelectionChange={this.handleSelectionChange}
        isSessionManager={this.props.isSessionManager}
      />
    );
  }
}

AdminUsersContainer.propTypes = {
  isSessionManager: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isSessionManager: isSessionManager(state),
});

export default connect(mapStateToProps)(AdminUsersContainer);
