import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from 'rapidfab/actions';
import { getBureauUri, getRoles } from 'rapidfab/selectors';

import UserForm from 'rapidfab/components/admin/UserForm';

class UserFormContainer extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.user.username) {
      const { name, emails } = this.props.user;
      this.state = {
        name: name || '',
        email: emails ? emails[0] : '',
      };
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
    const { dispatch, handleSelectionChange } = this.props;
    dispatch(Actions.Api.pao.users.post(payload))
      .then(response =>
        dispatch(
          Actions.Api.wyatt.role.post({
            bureau: this.props.bureau,
            username: response.json.username,
            role: 'restricted',
          })
        )
      )
      .then(() => {
        dispatch(Actions.Api.pao.users.list());
        handleSelectionChange('none');
      })
      .catch(() => {
        const userHasRoles = this.props.roles.some(
          role => role.username === this.state.email
        );
        if (!userHasRoles) {
          dispatch(Actions.UI.clearUIState());
          const rolePayload = {
            bureau: this.props.bureau,
            username: this.state.email,
            role: 'restricted',
          };
          dispatch(Actions.Api.wyatt.role.post(rolePayload))
            .then(() => {
              dispatch(Actions.Api.pao.users.list());
              handleSelectionChange('none');
            })
            .catch(() => {
              dispatch(Actions.UI.clearUIState());
              handleSelectionChange('none');
            });
        }
      });
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
  dispatch: PropTypes.func.isRequired,
  handleSelectionChange: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    emails: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string,
    uuid: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  bureau: getBureauUri(state),
  roles: getRoles(state),
});

export default connect(mapStateToProps)(UserFormContainer);
