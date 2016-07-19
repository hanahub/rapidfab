import _                        from "lodash";
import React, { Component }     from "react";
import * as BS                  from 'react-bootstrap';
import FakeData                 from 'rapidfab/fakeData';
import Grid                     from './grid';
import Form                     from './form';
import FormModal                from 'rapidfab/components/formModal';


class ThirdPartyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingUri: null,
      adding: false
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSave() {
    throw NotImplemented;
  }

  handleAdd(e) {
    this.setState({
      adding: true
    });
  }

  handleClose() {
    this.setState({
      editingData: null,
      adding: false
    });
  }

  handleEdit(e, data, rowData) {
    this.setState({
      editingData: rowData
    });
  }

  handleDelete() {
    this.setState({
      editingData: null
    });
  }

  render() {
    return (
      <BS.Grid>

        <FormModal
          data={this.state.editingData}
          showModal={!!(this.state.editingData || this.state.adding)}
          onClose={this.handleClose}
          onSave={this.handleSave}
          onDelete={this.handleDelete}
          title={this.state.editingData ? "Edit Third Party Provider" : "New Third Party Provider"}
        >
          <Form />
        </FormModal>

        <BS.Row>
          <BS.Col xs={12}>
            <BS.Breadcrumb>
              <BS.Breadcrumb.Item href="#/inventory">
                Inventory
              </BS.Breadcrumb.Item>
              <BS.Breadcrumb.Item href="#/inventory/third-party-provider">
                Third party service providers
              </BS.Breadcrumb.Item>
            </BS.Breadcrumb>
          </BS.Col>
        </BS.Row>

        <BS.Row>
          <BS.Col xs={12}>
            <Grid
              data={_.values(FakeData.third_party_provider)}
              onAdd={this.handleAdd}
              onEdit={this.handleEdit}
            />
          </BS.Col>
        </BS.Row>

      </BS.Grid>
    );
  }
}

export default ThirdPartyProvider
