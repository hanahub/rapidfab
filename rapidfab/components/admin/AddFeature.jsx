import React, { Component } from 'react';
import * as BS from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';

class NewFeature extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.state = { toggleActive: false };

    this.onToggle = this.onToggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  onSubmit(event) {
    event.preventDefault();
    const user = this.props.user.uri;
    const { featureName, featureDescription, featureBureau } = this.state;

    const payload = {
      name: featureName,
      description: featureDescription,
      bureau: featureBureau,
      user,
      enabled: this.state.toggleActive,
    };
    this.props.onSaveFeature(payload);
    this.setState({ showModal: false });
    this.setState({ toggleActive: false });
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
    return (
      <div>
        <BS.Button bsStyle="success" bsSize="medium" onClick={this.open}>
          Add feature
        </BS.Button>
        <BS.Modal show={this.state.showModal} onHide={this.close}>
          <BS.Form onSubmit={this.onSubmit}>
            <BS.Modal.Header closeButton>
              <BS.Modal.Title>Add new feature</BS.Modal.Title>
            </BS.Modal.Header>
            <BS.Modal.Body>
              <BS.FormGroup controlId="formBasicText">
                <BS.ControlLabel>Name:</BS.ControlLabel>
                <BS.FormControl
                  type="text"
                  name="featureName"
                  onChange={this.handleChange}
                  placeholder="Enter name"
                  required
                />
                <br />
                <BS.ControlLabel>Description:</BS.ControlLabel>
                <BS.FormControl
                  componentClass="textarea"
                  name="featureDescription"
                  onChange={this.handleChange}
                  placeholder="Enter description"
                  required
                />
                <br />
                <BS.ControlLabel>Bureau:</BS.ControlLabel>
                <BS.FormControl
                  type="text"
                  name="featureBureau"
                  onChange={this.handleChange}
                  placeholder="Enter a bureau"
                />
                <br />
                <BS.ControlLabel>Enabled: </BS.ControlLabel>
                <Toggle
                  onClick={this.onToggle}
                  on={<div>ON</div>}
                  off={<div>OFF</div>}
                  size="sm"
                  offstyle="primary"
                  active={this.state.toggleActive}
                />
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

export default NewFeature;
