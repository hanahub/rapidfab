import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getBureauURI } from 'rapidfab/selectors';

import UserForm from 'rapidfab/components/admin/UserForm';

class UserFormContainer extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.user.username) {
      const { name, emails } = this.props.user;
      this.state = { name, email: emails[0] };
    } else {
      this.state = { email: '', name: '' };
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
    const payload = { email, name };

    if (this.isEditing()) {
      this.updateUser(payload);
    } else {
      this.createUser(Object.assign(payload, { login: false }));
    }
  }

  createUser(payload) {
    const { dispatch } = this.props;
    dispatch(Actions.Api.pao.users.post(payload))
      .then(response => {
        const payload = {
          bureau: this.props.bureau,
          username: response.json.username,
          role: 'restricted',
        };
        this.props.dispatch(Actions.Api.wyatt.role.post(payload));
      })
      .then(response => {
        dispatch(Actions.Api.pao.users.list());
      })
      .catch(() => {});
  }

  updateUser(payload) {
    const { uuid } = this.props.user;
    this.props
      .dispatch(Actions.Api.pao.users.put(uuid, payload))
      .then(() => this.props.handleSelectionChange('none'))
      .catch(() => {});
  }

  isEditing() {
    return !!this.props.user.username;
  }

  render() {
    const { email, name } = this.state;
    return (
      <UserForm
        isEditing={this.isEditing()}
        email={email}
        name={name}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

UserFormContainer.defaultProps = { user: {} };

UserFormContainer.propTypes = {
  bureau: PropTypes.string.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({ bureau: getBureauURI(state) });

export default connect(mapStateToProps)(UserFormContainer);
