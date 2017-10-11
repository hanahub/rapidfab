import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';

import UserForm from 'rapidfab/components/admin/UserForm';

class UserFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      name: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, name } = this.state;
    const payload = { email, name, login: false };
    this.props.dispatch(Actions.Api.pao.users.post(payload))
      .then(() => this.props.handleSelectionChange('none'))
      .catch((e) => {});
  }

  render() {
    return (
      <UserForm
        {...this.props}
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

UserFormContainer.propTypes = {
  handleSelectionChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(UserFormContainer);
