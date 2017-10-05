import React, { Component } from 'react';
import _ from 'lodash';
import * as BS from 'react-bootstrap';

class ModifyUser extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.open = this.open.bind(this);
    this.state = { showModal: false };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSaveUser(
      this.props.bureau,
      this.props.role,
      this.state.userEmail,
      this.state.userName,
    );
    this.setState({ showModal: false });
  }

  deleteUser() {
    this.props.onDeleteUser(this.props.bureau, this.props.role);
  }

  handleChange(event) {
    if(event.target.name == 'role' && !this.state.location && this.props.locations.length) {
      this.setState({ location: this.props.locations[0].uri })
    }
    this.setState({ [event.target.name]: event.target.value });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { enabled, locations } = this.props;
    return (
      <div>
        <BS.Button bsSize="small" onClick={this.open} disabled={!enabled}>
          Modify User
        </BS.Button>
        <BS.Modal show={this.state.showModal} onHide={this.close}>
          <BS.Form onSubmit={this.onSubmit}>
            <BS.Modal.Header closeButton>
              <BS.Modal.Title>Modify a user</BS.Modal.Title>
            </BS.Modal.Header>
            <BS.Modal.Body>
              <BS.FormGroup controlId="formBasicText">
                <BS.ControlLabel>User Email:</BS.ControlLabel>
                <BS.FormControl
                  type="text"
                  name="userEmail"
                  onChange={this.handleChange}
                  value={
                    this.props.role.emails ? (
                      this.props.role.emails[0]
                    ) : null
                  }
                  disabled
                />
                <br />
                <BS.ControlLabel>Name:</BS.ControlLabel>
                <BS.FormControl
                  type="text"
                  name="userName"
                  onChange={this.handleChange}
                  defaultValue={this.props.role.name}
                  required
                />
                <br />
                <BS.ControlLabel>Role:</BS.ControlLabel>
                <BS.FormControl componentClass="select">
                  <option>Global User</option>
                  <option>Local User</option>
                  <option>Manager</option>
                </BS.FormControl>
                <br />
                <BS.ControlLabel>Location:</BS.ControlLabel>
                <BS.FormControl name="location" componentClass="select" defaultValue={this.props.role.location} disabled={this.state.role != 'location-user'} onChange={this.handleChange}>
                  {this.state.role != 'location-user' ? <option key="empty" value=""></option> : _.map(locations, location => (
                    <option key={location.uuid} value={location.uri}>
                      {location.name}
                    </option>
                  ))}
                </BS.FormControl>
              </BS.FormGroup>
            </BS.Modal.Body>
            <BS.Modal.Footer>
              <BS.Button onClick={this.close}>Cancel</BS.Button>
              <BS.Button bsStyle="danger" onClick={this.deleteUser}>
                Delete{' '}
              </BS.Button>
              <BS.Button bsStyle="warning" type="submit">
                Update{' '}
              </BS.Button>
            </BS.Modal.Footer>
          </BS.Form>
        </BS.Modal>
      </div>
    );
  }
}

export default ModifyUser;
