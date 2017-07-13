import React, { Component, PropTypes } from 'react'
import * as BS                         from 'react-bootstrap'

class ModifyUser extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const bureau = this.props.bureau.uri;
    const user = this.props.user.uri;
    const {
      userEmail,
      userName,
      userRole,
      userLocation,
    } = this.state;

    const payload = {
      email: userEmail,
      id: undefined,
      login: false,
      name: userName,
      uri: undefined,
      username: userName,
      uuid: this.props.user.uuid,
      bureau: bureau,
    }

    this.props.onSaveUser(payload);
    this.setState({ showModal: false });
  }

  deleteUser(){
    const user = this.props.user.uri;
    const payload = {

    }
    this.props.onDeleteUser(payload);
    console.log('User deleted: ', user)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
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

        <BS.Button
          bsSize="small"
          onClick={this.open}
        >
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
                    defaultValue={this.props.user.emails[0]}
                    required
                  />
                  <br />
                  <BS.ControlLabel>User Name:</BS.ControlLabel>
                  <BS.FormControl
                    type="text"
                    name="userName"
                    onChange={this.handleChange}
                    defaultValue={this.props.user.name}
                    required
                  />
                  <br />
                  <BS.ControlLabel>Role:</BS.ControlLabel>
                  <BS.FormControl componentClass="select">
                    <option>
                      "Global User"
                    </option>
                    <option>
                      "Local User"
                    </option>
                    <option>
                      "Manager"
                    </option>
                  </BS.FormControl>
                  <br />
                  <BS.ControlLabel>Location:</BS.ControlLabel>
                  <BS.FormControl componentClass="select">
                    {_.map(locations, location => (
                      <option key={location.uuid} value={location.uri}>
                        {location.name}
                      </option>
                      ))
                    }
                  </BS.FormControl>
                </BS.FormGroup>
              </BS.Modal.Body>
              <BS.Modal.Footer>
                <BS.Button onClick={this.close}>Cancel</BS.Button>
                <BS.Button bsStyle="danger" onClick={this.deleteUser}>Delete </BS.Button>
                <BS.Button bsStyle="warning" type="submit">Update </BS.Button>
              </BS.Modal.Footer>
             </BS.Form>
          </BS.Modal>
      </div>
    )
  }
}


export default ModifyUser
