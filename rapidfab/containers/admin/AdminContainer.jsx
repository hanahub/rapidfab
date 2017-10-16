import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isSessionManager } from 'rapidfab/selectors';

import Admin from 'rapidfab/components/admin/Admin';

class AdminContainer extends React.Component {
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
      <Admin
        selection={this.state.selection}
        handleSelectionChange={this.handleSelectionChange}
        isSessionManager={this.props.isSessionManager}
      />
    );
  }
}

AdminContainer.propTypes = {
  isSessionManager: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isSessionManager: isSessionManager(state),
});

export default connect(mapStateToProps)(AdminContainer);
