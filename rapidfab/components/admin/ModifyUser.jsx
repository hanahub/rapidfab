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
    this.state = { role: this.props.role.role || 'global-user', showModal: false };
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.props.newUser) {
      this.props.onCreateUser(
        this.props.bureau,
        this.state.userName,
        this.state.userEmail,
        this.state.role,
        this.state.location,
      )
    } else {
      this.props.onUpdateUser(
        this.props.role,
        this.state.role,
        this.state.location,
        this.state.userName,
        this.props.newUser,
      );
    }
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
        <BS.Button bsSize="small" bsStyle={this.props.newUser ? "success" : "info"} onClick={this.open} disabled={!enabled}>
          { this.props.newUser ? "Add User" : "Modify User" }
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
                  placeholder="someone@aol.com"
                  value={
                    this.props.role && this.props.role.emails
                      ? this.props.role.emails[0]
                      : null
                  }
                  disabled={!this.props.newUser}
                  required
                />
                <br />
                <BS.ControlLabel>Name:</BS.ControlLabel>
                <BS.FormControl
                  type="text"
                  name="userName"
                  onChange={this.handleChange}
                  placeholder="Billy Bobby"
                  defaultValue={this.props.role.name}
                  required
                />
                <br />
                <BS.ControlLabel>Role:</BS.ControlLabel>
                <BS.FormControl name="role" defaultValue={this.props.role ? this.props.role.role : null} onChange={this.handleChange} componentClass="select">
                  <option key="global-user" value="global-user">Global User</option>
                  <option key="location-user" value="location-user">Local User</option>
                  <option key="manager" value="manager">Manager</option>
                  <option key="restricted" value="restricted">Restricted</option>
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
              { this.props.newUser ?
                <BS.Button bsStyle="success" type="submit">Save{' '}</BS.Button>
              : <div>
                  <BS.Button bsStyle="danger" onClick={this.deleteUser}>
                    Delete{' '}
                  </BS.Button>
                  <BS.Button bsStyle="warning" type="submit">
                    Update{' '}
                  </BS.Button>
                </div>
              }
            </BS.Modal.Footer>
          </BS.Form>
        </BS.Modal>
      </div>
    );
  }
}

export default ModifyUser;
