import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import Grid from 'rapidfab/components/grid';
import * as BS from 'react-bootstrap';
import Fa from 'react-fontawesome';


class EditColumn extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    this.props.metadata.onEdit(e, this.props.data, this.props.rowData);
  }

  render() {
    return (
      <BS.Button bsStyle="success" bsSize="small" onClick={this.handleEdit}>
        <Fa name="pencil" />
      </BS.Button>
    );
  }
}

const EditColumnHeader = ({ onAdd }) => (
  <BS.Button bsStyle="primary" bsSize="small" onClick={onAdd}>
    <Fa name="plus" />
  </BS.Button>
);

class EditorGrid extends Component {
  render() {
    const columns = _.concat(this.props.columns, ['uri']);
    const columnMeta = _.concat(this.props.columnMeta, [{
      order: 999,
      columnName: 'uri',
      visible: true,
      locked: true,
      sortable: false,
      onEdit: this.props.onEdit,
      customComponent: EditColumn,
      customHeaderComponent: EditColumnHeader,
      customHeaderComponentProps: { onAdd: this.props.onAdd },
    }]);
    return (
      <Grid
        data={_.values(this.props.data)}
        columns={columns}
        columnMeta={columnMeta}
      />
    );
  }
}

EditorGrid.propTypes = {
  data: PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.object),
    React.PropTypes.object,
  ]),
  columnMeta: React.PropTypes.arrayOf(React.PropTypes.object),
  columns: React.PropTypes.arrayOf(React.PropTypes.string),
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

EditorGrid.defaultProps = {
  columns: [],
  columnMeta: [],
  data: [],
};

export default EditorGrid;
