import React, { Component } from 'react';
import * as BS from 'react-bootstrap';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const bureau = this.props.bureau.uri;
    const { userEmail, userName } = this.state;

    const payload = {
      email: userEmail,
      id: undefined,
      login: false,
      name: userName,
      uri: undefined,
      username: userEmail,
      uuid: undefined,
      bureau,
    };
    this.props.onSaveUser(payload);
    this.setState({ showModal: false });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { locations } = this.props;
    return (
      <div>
        <BS.Button bsStyle="success" bsSize="medium" onClick={this.open}>
          Add User
        </BS.Button>
        <BS.Modal show={this.state.showModal} onHide={this.close}>
          <BS.Form onSubmit={this.onSubmit}>
            <BS.Modal.Header closeButton>
              <BS.Modal.Title>Add new user</BS.Modal.Title>
            </BS.Modal.Header>
            <BS.Modal.Body>
              <BS.FormGroup controlId="formBasicText">
                <BS.ControlLabel>User Email:</BS.ControlLabel>
                <BS.FormControl
                  type="text"
                  name="userEmail"
                  onChange={this.handleChange}
                  placeholder="Enter user email"
                  onChange={this.handleChange}
                  required
                />
                <br />
                <BS.ControlLabel>Name:</BS.ControlLabel>
                <BS.FormControl
                  type="text"
                  name="userName"
                  onChange={this.handleChange}
                  placeholder="Enter user name"
                  onChange={this.handleChange}
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
                <BS.FormControl componentClass="select">
                  {_.map(locations, location =>
                    <option key={location.uuid} value={location.uri}>
                      {location.name}
                    </option>
                  )}
                </BS.FormControl>
              </BS.FormGroup>
            </BS.Modal.Body>
            <BS.Modal.Footer>
              <BS.Button onClick={this.close}>Cancel</BS.Button>
              <BS.Button bsStyle="success" type="submit">
                Save{' '}
              </BS.Button>
            </BS.Modal.Footer>
          </BS.Form>
        </BS.Modal>
      </div>
    );
  }
}

export default AddUser;
