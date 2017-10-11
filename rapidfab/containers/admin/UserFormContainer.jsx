import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserForm from 'rapidfab/components/admin/UserForm';

class UserFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      name: '',
    }
  }

  render() {
    return <UserForm {...this.props} {...this.state}/>;
  }
}

export default UserFormContainer;
