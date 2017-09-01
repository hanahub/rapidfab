import React, { Component } from 'react';
import * as BS from 'react-bootstrap';

class FormModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(e) {
    this.props.onSave(e);
  }

  handleDelete(e) {
    this.props.onDelete(e);
  }

  render() {
    const { data, showModal, onClose, title } = this.props;
    return (
      <BS.Form onSubmit={this.handleSubmit}>
        <BS.Modal show={showModal} backdrop="static" onHide={onClose}>
          <BS.ModalHeader closeButton>
            <BS.Modal.Title>{title}</BS.Modal.Title>
          </BS.ModalHeader>
          <BS.Modal.Body>{this.props.children}</BS.Modal.Body>
          <BS.Modal.Footer>
            <BS.Row>
              <BS.Col xs={6}>
                {data ? (
                  <BS.Button onClick={this.handleDelete} bsStyle="danger" block>
                    Delete
                  </BS.Button>
                ) : null}
              </BS.Col>
              <BS.Col xs={6}>
                <BS.Button bsStyle="success" type="submit" block>
                  Save
                </BS.Button>
              </BS.Col>
            </BS.Row>
          </BS.Modal.Footer>
        </BS.Modal>
      </BS.Form>
    );
  }
}

FormModal.propTypes = {
  data: React.PropTypes.object,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  title: React.PropTypes.node.isRequired,
};

export default FormModal;
